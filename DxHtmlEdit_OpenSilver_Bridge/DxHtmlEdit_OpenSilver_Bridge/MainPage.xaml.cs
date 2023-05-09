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
        }

        private async void MainPage_Loaded(object sender, RoutedEventArgs e)
        {
            //await HtmlEdit.Initialize();
        }

        private void btnExecute_Click(object sender, RoutedEventArgs e)
        {
            var myHtmlEdit = new HtmlEdit { Name = "myHtmlEdit" };
            Grid.SetRow(myHtmlEdit, 3);
            myStackPanel.Children.Add(myHtmlEdit);
        }

        private async void btnInit_Click(object sender, RoutedEventArgs e)
        {
            await HtmlEdit.Initialize();
            btnExecute.IsEnabled = true;
        }
    }
}