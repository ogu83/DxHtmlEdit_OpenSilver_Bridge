using DevExpress.RichEdit;
using System.Windows;
using System.Windows.Controls;

namespace DxHtmlEdit_OpenSilver_Bridge
{
    public partial class MainPage : Page
    {
        public MainPage()
        {
            InitializeComponent();
            Loaded += MainPage_Loaded;
            // Enter construction logic here...
        }

        private async void MainPage_Loaded(object sender, RoutedEventArgs e)
        {
            await HtmlEdit.Initialize();
            var myHtmlEdit = new HtmlEdit { Name = "myHtmlEdit" };
            Grid.SetRow(myHtmlEdit, 1);
            myStackPanel.Children.Add(myHtmlEdit);
        }
    }
}