from Parts import Itinerary, Segment, Property, Day

def getDayBody(isPrivate, prop):
    ret = ""
    type = prop.type
    if type=="camp":
        if isPrivate:
            ret = "On safari! Enjoy morning and afternoon private game activities. "
        else:
            ret = "On safari! Enjoy morning and afternoon shared game activities. "
        ret = ret + "All meals will be served at camp."
    return ret

name = "Beal Family Vacation"
where = "Southern Africa"
when = "May 2019"
agent = "Craig"
agency = "Travel Beyond"

itin = Itinerary(name, where, when, agent, agency)

print(itin.name)
print itin.where, itin.when
print itin.agent, "at", itin.agency

##

name = "MalaMala"
city = "MalaMala Game Reserve"
country = "South Africa"
inclusions = "all meals and shared game activities are "
notes = ""
type = "camp"
webpage = "www.malamala.com"
airstrip = ""

prop = Property(name, city, country, inclusions, notes, type, webpage, airstrip)

##

property = prop
roomType = "2 Double Beds"

segment = Segment(property, roomType)

# print(segment.property.name)
# print(segment.property.city)
# print(segment.property.country)
# print(segment.property.inclusions)
# print(segment.property.notes)
# print(segment.property.type)
# print(segment.property.webpage)
# print(segment.property.airstrip)
# print(segment.roomType)

##

isPrivate = False
dayHeader = "Day 1 / "
header = "Arrive " + segment.property.city + ", " + segment.property.country
body = getDayBody(isPrivate, segment.property)
room = segment.roomType
meals = "D"

day = Day(dayHeader, header, body, room, meals)

print
print(day.dayHeader + day.header)
print(day.body)
print(day.room)
print("Meals: " + meals)

##

segment.dayList.append(day)

itin.segmentList.append(segment)

print "Seg 1 property:", itin.segmentList[0].property.name

