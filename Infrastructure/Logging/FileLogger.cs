using System;
using System.IO;
using Microsoft.Extensions.Logging;

namespace Transfers {

    public class FileLogger : ILogger {

        protected readonly FileLoggerProvider _fileLoggerProvider;

        public FileLogger(FileLoggerProvider fileLoggerProvider) {
            _fileLoggerProvider = fileLoggerProvider;
        }

        public IDisposable BeginScope<TState>(TState state) {
            return null;
        }

        public bool IsEnabled(LogLevel logLevel) {
            return logLevel != LogLevel.None;
        }

        public void Log<TState>(LogLevel logLevel, EventId eventId, TState state, Exception exception, Func<TState, Exception, string> formatter) {

            if (!IsEnabled(logLevel)) {
                return;
            };

            var fullPathName = string.Format("{0}/{1}", _fileLoggerProvider.Options.FolderPath, _fileLoggerProvider.Options.FilePath.Replace("{date}", DateTime.Now.ToString("yyyy-MM-dd")));
            // var logEntry = string.Format("{0} [{1}] {2} {3}", DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss"), logLevel.ToString(), formatter(state, exception), (exception != null ? "OOPS!" : ""));
            var logEntry = string.Format("{0} [{1}] {2} {3}", DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss"), logLevel.ToString(), state, (exception != null ? "OOPS!" : ""));

            using(var streamWriter = new StreamWriter(fullPathName, true)) {
                streamWriter.WriteLine(logEntry);
            }

        }

    }

}