using System;
namespace DevExpress.RichEdit
{
    public partial class HtmlEdit
    {
        #region Events

        public class HtmlEditorEventArgs : EventArgs
        {
            public HtmlEditorEventArgs()
            {

            }

            public HtmlEditorEventArgs(string value)
            {
                Value = value;
            }

            public readonly string Value;
        }

        #endregion
    }
}
