namespace AddressBook.ServiceLayer.Entries.Commands
{
    public class AjaxCommandResult
    {
        public AjaxCommandResult(bool success = false)
        {
            this.Success = success;
        }

        public int Id { get; set; }
        public bool Success { get; set; }
    }
}
