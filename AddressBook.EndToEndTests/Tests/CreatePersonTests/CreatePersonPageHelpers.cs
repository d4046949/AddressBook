using AddressBook.EndToEndTests.Helpers;
using OpenQA.Selenium;

namespace AddressBook.EndToEndTests.Tests.CreatePersonTests
{
    public class CreatePersonPageHelper
    {
        private readonly IWebDriver _driver;

        public CreatePersonPageHelper(IWebDriver driver)
        {
            _driver = driver;
        }

        public IWebElement NewPersonBtn => _driver.CustomFindElement(By.Id("create_new_person_btn"));

        public IWebElement SideBar => _driver.CustomFindElement(By.ClassName("sidebar-overlay"), 5);

        public IWebElement SavePersonButton => _driver.CustomFindElement(By.CssSelector("[data-test-reference='create-new-person-btn']"));

        private IWebElement ForenameValidation => _driver.CustomFindElement(By.Id("Forename-error"));

        private IWebElement SurnameValidation => _driver.CustomFindElement(By.Id("Surname-error"));

        public string NewButtonText => NewPersonBtn?.Text;

        public bool IsSidebarVisible => SideBar.Displayed;

        public string ForenameValidationMessage => ForenameValidation?.Text;

        public bool IsForenameValidationShown => ForenameValidation.Displayed;

        public string SurnameValidationMessage => SurnameValidation?.Text;

        public bool IsSurnameValidationShown => SurnameValidation.Displayed;
    }
}
