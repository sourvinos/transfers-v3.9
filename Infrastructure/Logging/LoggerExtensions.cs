using System;
using System.Reflection;
using System.Text;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;

namespace Transfers {

    public static class LoggerExtensions {

        #region Public methods

        public static ILoggingBuilder FileLogger(this ILoggingBuilder builder, Action<FileLoggerOptions> configure) {
            builder.Services.AddSingleton<ILoggerProvider, FileLoggerProvider>();
            builder.Services.Configure(configure);
            return builder;
        }

        public static void LogDatabaseError(ILogger logger, ControllerContext context, DbUpdateException exception, Object record) {
            logger.LogError("{caller} {error} {record}",
                GetControllerAndActionName(context),
                GetDatabaseError(exception),
                GetObjectProperties(record));
        }

        public static void LogInvalidModel(ILogger logger, ControllerContext context, Object record) {
            logger.LogError("{caller} {error} {record}",
                GetControllerAndActionName(context),
                GetSimpleDescription(ApiMessages.InvalidModel()),
                GetObjectProperties(record));
        }

        public static void LogRecordNotFound(ILogger logger, ControllerContext context, int id) {
            logger.LogError("{caller} {error}",
                GetControllerAndActionName(context),
                GetSimpleDescription($"Id {id} not found"));
        }

        #endregion

        #region Private methods

        private static String GetControllerAndActionName(ControllerContext context) {
            var sb = new StringBuilder();
            sb.AppendLine();
            sb.Append("\t");
            sb.Append("Controller: " + context.ActionDescriptor.ControllerName);
            sb.AppendLine();
            sb.Append("\t");
            sb.Append("Action: " + context.ActionDescriptor.ActionName);
            return sb.ToString();
        }

        private static String GetObjectProperties(Object myObject) {
            var sb = new StringBuilder();
            PropertyInfo[] properties = myObject.GetType().GetProperties();
            foreach (PropertyInfo p in properties) {
                sb.AppendLine();
                sb.Append("\t");
                sb.Append(string.Format(" - {0}: {1}", p.Name, p.GetValue(myObject, null)));
            }
            return sb.ToString();
        }

        private static String GetDatabaseError(DbUpdateException exception) {
            var sb = new StringBuilder();
            sb.AppendLine();
            sb.Append("\t");
            sb.Append("Error: " + exception.InnerException.Message);
            return sb.ToString();
        }

        private static String GetSimpleDescription(String description) {
            var sb = new StringBuilder();
            sb.AppendLine();
            sb.Append("\t");
            sb.Append("Error: " + description);
            return sb.ToString();
        }

        #endregion

    }

}