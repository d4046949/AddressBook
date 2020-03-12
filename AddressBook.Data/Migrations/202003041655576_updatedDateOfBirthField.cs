namespace AddressBook.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class updatedDateOfBirthField : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.People", "DateOfBirth", c => c.DateTime(nullable: false));
        }
        
        public override void Down()
        {
            AlterColumn("dbo.People", "DateOfBirth", c => c.String(maxLength: 4000));
        }
    }
}
