using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace BeerCatalog.Repositories.Migrations
{
    public partial class Changerelationbetweenuserandpref : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Comment_Brewing_PostId",
                table: "Comment");

            migrationBuilder.DropForeignKey(
                name: "FK_Preference_AspNetUsers_UserId",
                table: "Preference");

            migrationBuilder.DropIndex(
                name: "IX_Preference_UserId",
                table: "Preference");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "Preference");

            migrationBuilder.CreateTable(
                name: "UserPreference",
                columns: table => new
                {
                    UserId = table.Column<string>(nullable: false),
                    PreferenceId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserPreference", x => new { x.UserId, x.PreferenceId });
                    table.ForeignKey(
                        name: "FK_UserPreference_Preference_PreferenceId",
                        column: x => x.PreferenceId,
                        principalTable: "Preference",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UserPreference_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_UserPreference_PreferenceId",
                table: "UserPreference",
                column: "PreferenceId");

            migrationBuilder.AddForeignKey(
                name: "FK_Comment_Brewing_PostId",
                table: "Comment",
                column: "PostId",
                principalTable: "Brewing",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Comment_Brewing_PostId",
                table: "Comment");

            migrationBuilder.DropTable(
                name: "UserPreference");

            migrationBuilder.AddColumn<string>(
                name: "UserId",
                table: "Preference",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Preference_UserId",
                table: "Preference",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Comment_Brewing_PostId",
                table: "Comment",
                column: "PostId",
                principalTable: "Brewing",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Preference_AspNetUsers_UserId",
                table: "Preference",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
