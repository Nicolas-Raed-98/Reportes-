using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using www.cepas.tur.ar.Data.Repositories;
using www.cepas.tur.ar.Extensions;
using www.cepas.tur.ar.Models;

namespace www.cepas.tur.ar.Providers.Report
{
    public interface IGuideReportProvider
    {
        List<GuideByDateViewModel> GetGuidesReport(GuideReportRequestViewModel request);
    }
    public class GuideReportProvider : IGuideReportProvider
    {
        private readonly IActivityRepository _activityRepository;
        public GuideReportProvider(IActivityRepository activityRepository)
        {
            _activityRepository = activityRepository;
        }
        public List<GuideByDateViewModel> GetGuidesReport(GuideReportRequestViewModel request)
        {
            var from = request.From.ToDateTime();
            var to = request.To.ToDateTime(23, 59, 59);

            var activities = _activityRepository.GetAllByDateRangeReport(from, to).OrderBy(x => x.Guide.Name);

            var guidesByDateViewModel = new ConcurrentDictionary<string, GuideByDateViewModel>();

            foreach (var activity in activities)
            {
                var key = activity.Guide.Name;
                if (!guidesByDateViewModel.ContainsKey(key))
                {
                    {
                        guidesByDateViewModel[key] = new GuideByDateViewModel

                        {
                            NameGuide = key,
                            Quantity = activities.Count(x => x.ActivityDateTime.Year == activity.ActivityDateTime.Year && x.ActivityDateTime.Month == activity.ActivityDateTime.Month)
                        };
                    }
                }
            }

            return guidesByDateViewModel.Values.OrderByDescending(x => x.Quantity).Take(10).OrderBy(x => x.NameGuide).ToList();
        }
    }
}
