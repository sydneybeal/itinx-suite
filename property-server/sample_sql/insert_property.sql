-- inserts a new starter property into the database via backend
-- this is typically done in the UI itself, along with entering a service provider
INSERT INTO `itinx-db`.properties (
  `name`, portfolio, rep, city_region, country, inclusions, notes, `type`, webpage, airstrip
)
VALUES (
  'Mombo Camp',
  'Wilderness Safaris',
  'unknown',
  'Moremi Game Reserve',
  'Botswana',
  'All meals, local drinks (excluding premium import brands and champagne), shared game activities and laundry are',
  '',
  'camp',
  'http://wetu.com/iBrochure/en/Launch/8588_9994/Mombo_Camp/Landing',
  ''
);
