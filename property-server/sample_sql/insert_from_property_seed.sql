-- Raw CSV stored in Google cloud of previously existing properties to work with
INSERT INTO `itinx-db`.properties (
select
null as property_id,
property as name,
'N/A' as portfolio,
'N/A' as rep,
coalesce(nullif(city_park,''), 'unk') as city_region,
coalesce(nullif(country,''), 'unk') as country,
coalesce(nullif(inclusions,''), 'unk') as inclusions,
coalesce(nullif(note,''), 'unk') as notes,
coalesce(nullif(prop_type,''), 'unk') as type,
coalesce(nullif(link,''), 'unk') as webpage,
coalesce(nullif(airport,'\r'), 'unk') as airstrip
from
properties_raw);
