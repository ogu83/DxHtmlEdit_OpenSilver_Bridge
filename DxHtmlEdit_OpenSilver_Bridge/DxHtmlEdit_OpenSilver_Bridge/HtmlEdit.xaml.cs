using System;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Browser;
using System.Windows.Controls;

namespace DevExpress.RichEdit
{
    /// <summary>
    /// Documentation : https://demos.devexpress.com/ASPNetCore/Demo/HtmlEditor/Overview/
    /// </summary>
    public partial class HtmlEdit : UserControl
    {
        private static bool _initialized;
        private bool _loaded;
        private string _tempContent = string.Empty;
        private string _lastContent = string.Empty;
        private double? _tempHeight;
        private string _lastValue = string.Empty;

        public static async Task Initialize()
        {
            if (_initialized)
                return;

            _initialized = true;

            const string path = "ms-appx:///DxHtmlEdit_OpenSilver_Bridge/js/";

            await OpenSilver.Interop.LoadCssFile($"{path}dx.light.css");

            await OpenSilver.Interop.LoadJavaScriptFile($"{path}/jquery-3.5.1.min.js");

            await OpenSilver.Interop.LoadJavaScriptFile($"{path}dx-quill.min.js");
            await OpenSilver.Interop.LoadJavaScriptFile($"{path}dx.all.js");
            //await OpenSilver.Interop.LoadJavaScriptFile($"{path}dx.messages.sv.js");
            await OpenSilver.Interop.LoadJavaScriptFile($"{path}htmlEdit-creator.js");

#if DEBUG
            OpenSilver.Interop.ExecuteJavaScript("console.log('HtmlEdit Javascript files initialized')");
#endif
        }

        public HtmlEdit()
        {
            //SizeChanged += HtmlEdit_SizeChanged;
            Loaded += HtmlEdit_Loaded;
            Unloaded += HtmlEdit_Unloaded;
            InitializeComponent();
        }

        private void HtmlEdit_SizeChanged(object sender, SizeChangedEventArgs e)
        {
            if (e.NewSize.Height < 2)
                return;

            SetHeight(e.NewSize.Height);
        }

        private void HtmlEdit_Unloaded(object sender, RoutedEventArgs e)
        {
            _lastContent = HtmlText;
            //#if DEBUG
            //            OpenSilver.Interop.ExecuteJavaScript("console.log('HtmlEdit_Unloaded')");
            //#endif
            OpenSilver.Interop.ExecuteJavaScript("jsHtmlEditClient.dispose()");
            _loaded = false;
        }

        private void HtmlEdit_Loaded(object sender, RoutedEventArgs e)
        {
            //#if DEBUG
            //            OpenSilver.Interop.ExecuteJavaScript("console.log('HtmlEdit_Loaded')");
            //#endif
            if (_loaded)
            {
                //#if DEBUG
                //                OpenSilver.Interop.ExecuteJavaScript("console.log('redraw')");
                //#endif
                OpenSilver.Interop.ExecuteJavaScript("jsHtmlEditClient.redraw()");
                return;
            }

            OpenSilver.Interop.ExecuteJavaScript("jsHtmlEditClient.createHtmlEdit($0, $1)",
                (Action)Initialized,
                (Action<string>)ValueChanged);

        }

        #region Events

        public event EventHandler<HtmlEditorEventArgs> OnValueChanged;
        public event EventHandler<HtmlEditorEventArgs> OnTextChanged;
        public event EventHandler<HtmlEditorEventArgs> TextChanged;
        public event EventHandler<HtmlEditorEventArgs> HtmlTextChanged;
        public event EventHandler OnInitialized;

        [ScriptableMember(ScriptAlias = "onValueChanged")]
        public void ValueChanged(string v)
        {
            //#if DEBUG && OPENSILVER
            //            OpenSilver.Interop.ExecuteJavaScript($"console.log('HtmlEdit.ValueChanged to {v}')");
            //#endif

            if (v == _lastValue)
                return;

            _lastValue = v;

            var c = this;
            if (OnValueChanged != null)
                OnValueChanged(c, new HtmlEditorEventArgs(v));

            if (OnTextChanged != null)
                OnTextChanged(c, new HtmlEditorEventArgs(v));

            if (TextChanged != null)
                TextChanged(c, new HtmlEditorEventArgs(v));

            if (HtmlTextChanged != null)
                HtmlTextChanged(c, new HtmlEditorEventArgs(v));
        }

        [ScriptableMember(ScriptAlias = "onInitialized")]
        public void Initialized()
        {
            _loaded = true;

            if (OnInitialized != null)
                OnInitialized(this, null);

            if (_tempHeight != null)
            {
                SetHeight(_tempHeight.GetValueOrDefault());
                _tempHeight = null;
            }
            else
            {
                SetHeight(ActualHeight);
                //SetHeight(Height);
            }

            if (!string.IsNullOrEmpty(_tempContent))
            {
                HtmlText = _tempContent;
                _tempContent = string.Empty;
                _lastContent = string.Empty;
            }
            else if (!string.IsNullOrEmpty(_lastContent))
            {
                HtmlText = _lastContent;
                _lastContent = string.Empty;
            }
        }

        #endregion

        #region Properties

        public static readonly DependencyProperty HtmlProperty = DependencyProperty.Register("Html", typeof(string), typeof(UserControl), new PropertyMetadata(null, OnHtmlChanged));

        private static void OnHtmlChanged(DependencyObject d, DependencyPropertyChangedEventArgs e)
        {
            var obj = d as HtmlEdit;
            if (obj != null)
            {
                obj.ValueChanged(e.NewValue.ToString());
            }
        }

        /// <summary>
        /// The Document inside control, value of DxHtmlEditor instance
        /// </summary>
        public string Html
        {
            get
            {
                if (!_loaded)
                {
                    return _lastContent;
                }

                var result = OpenSilver.Interop.ExecuteJavaScript("jsHtmlEditClient.getValue()");
                if (result == null)
                {
                    return string.Empty;
                }
                //#if DEBUG
                //                OpenSilver.Interop.ExecuteJavaScript($"console.log('HtmlEdit.Html.Get : {result.ToString()}')");
                //#endif
                return result.ToString();
            }
            set
            {
                if (value == null)
                    return;

                if (!_loaded)
                {
                    _tempContent = value;
                    _lastContent = string.Empty;
                    return;
                }

                //Remove New Lines and Tab chars from the string, Replace ' with `, javascript is using ' to define string variable input already
                value = Regex.Replace(value, @"\t|\n|\r", "").Replace('\'', '`'); 

                OpenSilver.Interop.ExecuteJavaScript($"jsHtmlEditClient.setValue('{value}')");
                SetValue(HtmlProperty, value);

                _tempContent = string.Empty;
                _lastContent = string.Empty;
            }
        }

        /// <summary>
        /// Same Property for Html
        /// The Document inside control, value of DxHtmlEditor instance
        /// </summary>
        public string HtmlText
        {
            get { return Html; }
            set { Html = value; }
        }

        /// <summary>
        /// Specifies whether the editor is read-only.
        /// </summary>
        public bool ReadOnly
        {
            get
            {
                if (!_loaded)
                    return false;

                var result = Convert.ToBoolean(OpenSilver.Interop.ExecuteJavaScript("jsRichEditClient.getReadOnly()"));
                return result;
            }
            set
            {
                if (!_loaded)
                    return;

                var val = value ? "true" : "false";
                OpenSilver.Interop.ExecuteJavaScript($"jsRichEditClient.setReadOnly({val})");
            }
        }

        #endregion

        #region Methods

        /// <summary>
        /// Applies a single text format to all characters in the given range.
        /// </summary>
        /// <param name="index">A zero-based index at which to begin formatting.</param>
        /// <param name="length">The length of the content to be formatted.</param>
        /// <param name="formatName">A format name : background,bold,color,font,italic,link,size,strike,script,underline,blockquote,header,indent,list,align,code-block'</param>
        /// <param name="formatValue">A format value. Pass null to remove a format.</param>
        public void FormatText(int index, int length, string formatName, object formatValue)
        {
            OpenSilver.Interop.ExecuteJavaScript($"jsHtmlEditClient.formatText({index}, {length}, '{formatName}', {formatValue})");
        }

        /// <summary>
        /// Gets the entire content's length.
        /// </summary>
        /// <returns></returns>
        public int GetLength()
        {
            return Convert.ToInt32(OpenSilver.Interop.ExecuteJavaScript($"jsHtmlEditClient.getLength()"));
        }

        public void SetHeight(double value)
        {
            //#if DEBUG && OPENSILVER
            //            OpenSilver.Interop.ExecuteJavaScript($"console.log('HtmlEdit.SetHeight {value}, _loaded: {_loaded}, _tempHeight: {_tempHeight}')");
            //#endif
            if (!_loaded)
            {
                _tempHeight = value;
                return;
            }

            OpenSilver.Interop.ExecuteJavaScript($"jsHtmlEditClient.setHeight('{(int)value}px')");
        }

        #endregion
    }
}