using System;
using System.Net;

namespace BeerCatalog.API.Infrastructure
{
    [Serializable]
    public class RequestApiException : Exception
    {
        private HttpStatusCode _statusCode; 
        public HttpStatusCode StatusCode
        {
            get
            {
                return _statusCode;
            }
            set
            {
                _statusCode = value;
            }
        }
        public RequestApiException() { }
        public RequestApiException(string message) : base(message) { }
        public RequestApiException(string message, HttpStatusCode statusCode) : base(message)
        {
            _statusCode = statusCode;
        }
        public RequestApiException(string message, Exception inner) : base(message, inner) { }
        public RequestApiException(string message, HttpStatusCode statusCode, Exception inner) : base(message, inner)
        {
            _statusCode = statusCode;
        }
    }
}
