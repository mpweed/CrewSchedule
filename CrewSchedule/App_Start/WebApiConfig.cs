using Newtonsoft.Json.Serialization;
using System.Web.Http;

namespace CrewSchedule
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            // Web API configuration and services

            // Web API routes
            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );

            // Set up JSON serialization and remove XML serialization
            var json = config.Formatters.JsonFormatter;
            config.Formatters.Remove(config.Formatters.XmlFormatter);

            // Convert object property names from Pascal-case to Camel-case to conform to the standard for JSON
            json.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
        }
    }
}
