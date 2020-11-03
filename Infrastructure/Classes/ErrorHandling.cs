using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;

namespace Transfers {

    public class ErrorHandlingMiddleware {

        private readonly RequestDelegate next;

        public ErrorHandlingMiddleware(RequestDelegate next) {
            this.next = next;
        }

        public async Task Invoke(HttpContext context) {
            try {
                await next(context);
            } catch (DbUpdateException ex) {
                await HandleExceptionAsync(context, ex);
            }
        }

        private static Task HandleExceptionAsync(HttpContext context, DbUpdateException exception) {
            if (exception is DbUpdateException) {
                Console.WriteLine("CAUGHT!");
            }
            return context.Response.WriteAsync("ERROR!!!");
        }

    }

}