using OpenQA.Selenium;
using OpenQA.Selenium.Support.UI;
using System;
using System.Linq;

namespace AddressBook.EndToEndTests.Helpers
{
    public static class DriverHelpers
    {
        public static IWebElement CustomFindElement(this IWebDriver driver, By by, int? timeout = null)
        {
            try
            {
                if (timeout.HasValue)
                {
                    return new WebDriverWait(driver, TimeSpan.FromSeconds(timeout.Value))
                        .Until(d => d.FindElements(by)
                        .FirstOrDefault());
                }

                return driver.FindElements(by)
                    .FirstOrDefault();
            }
            catch
            {
                return null;
            }
        }
    }
}
