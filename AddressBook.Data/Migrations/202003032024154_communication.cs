namespace AddressBook.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class communication : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Communications",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Type = c.Int(nullable: false),
                        Url = c.String(maxLength: 4000),
                        PersonId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.People", t => t.PersonId, cascadeDelete: true)
                .Index(t => t.PersonId);
            
            AddColumn("dbo.People", "DateOfBirth", c => c.String(maxLength: 4000));
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Communications", "PersonId", "dbo.People");
            DropIndex("dbo.Communications", new[] { "PersonId" });
            DropColumn("dbo.People", "DateOfBirth");
            DropTable("dbo.Communications");
        }
    }
}
