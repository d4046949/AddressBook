using AddressBook.EndToEndTests.Tests.CreatePersonTests;
using NUnit.Framework;
using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
using OpenQA.Selenium.Support.UI;
using System;

namespace AddressBook.EndToEndTests
{
    [TestFixture]
    public class CreatePersonTests : IDisposable
    {
        private IWebDriver _driver;
        private string _applicationBrowserUrl;
        private CreatePersonPageHelper _page;

        [OneTimeSetUp]
        public void Init()
        {
            _applicationBrowserUrl = "http://localhost/addressbook";
            _driver = new ChromeDriver();
            _page = new CreatePersonPageHelper(_driver);

            _driver.Navigate().GoToUrl(_applicationBrowserUrl);
            new WebDriverWait(_driver, TimeSpan.FromSeconds(15));
        }


        [Test]
        public void Create_New_Button_Is_Present_On_Home_Page()
        {
            // Setup
            _driver.Navigate().GoToUrl(_applicationBrowserUrl);

            // Assert
            Assert.AreEqual(_page.NewButtonText, "Create New Person");
        }

        [Test]
        public void Pressing_Create_New_Button_Shows_Right_Hand_Panel()
        {
            // Setup
            _driver.Navigate().GoToUrl(_applicationBrowserUrl);

            // Act
            _page.NewPersonBtn.Click();

            // Assert
            Assert.IsTrue(_page.IsSidebarVisible);
        }

        [Test]
        public void Omitting_Forename_When_Submitting_New_Person_Causes_Validation_Error()
        {
            // Setup
            _driver.Navigate().GoToUrl(_applicationBrowserUrl);

            // Act
            _page.NewPersonBtn.Click();

            _page.SavePersonButton.Click();

            // Assert
            Assert.IsTrue(_page.IsForenameValidationShown);
        }


        [Test]
        public void Omitting_Forename_When_Submitting_New_Person_Shows_Correct_Validation()
        {
            // Setup
            _driver.Navigate().GoToUrl(_applicationBrowserUrl);

            // Act
            _page.NewPersonBtn.Click();

            _page.SavePersonButton.Click();

            // Assert
            Assert.AreEqual("The Forename field is required.", _page.ForenameValidationMessage);
        }

        [Test]
        public void Omitting_Surname_When_Submitting_New_Person_Causes_Validation_Error()
        {
            // Setup
            _driver.Navigate().GoToUrl(_applicationBrowserUrl);

            // Act
            _page.NewPersonBtn.Click();

            _page.SavePersonButton.Click();

            // Assert
            Assert.IsTrue(_page.IsSurnameValidationShown);
        }


        [Test]
        public void Omitting_Surname_When_Submitting_New_Person_Shows_Correct_Validation()
        {
            // Setup
            _driver.Navigate().GoToUrl(_applicationBrowserUrl);

            // Act
            _page.NewPersonBtn.Click();

            _page.SavePersonButton.Click();

            // Assert
            Assert.AreEqual("The Surname field is required.", _page.SurnameValidationMessage);
        }

       

        public void Dispose()
        {
            Console.WriteLine("Destroy the browser");
            _driver?.Quit();
        }
    }
}
