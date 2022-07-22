class Itinerary:
    def __init__(self, name, where, when, agent, agency):
        # return itinerary object with initial conditions
        self.name = name
        self.where = where
        self.when = when
        self.agent = agent
        self.agency = agency

    segmentList = []

    def setTransferIn(self, transferIn):
        self.transferIn = transferIn

    def setTransferOut(self, transferOut):
        self.transferOut = transferOut


class Segment:
    def __init__(self, property, roomType):
        # return segment object with initial conditions
        self.property = property
        self.roomType = roomType

    dayList = []
    nights = len(dayList)

    def set_transfer_out(self, transferOut):
        self.transferOut = transferOut


class Property:
    def __init__(self, name, city, country, inclusions, notes, type, webpage, airstrip):
        # return property object with initial conditions
        self.name = name
        self.city = city
        self.country = country
        self.inclusions = inclusions
        self.notes = notes
        self.type = type
        self.webpage = webpage
        self.airstrip = airstrip


class Day:
    def __init__(self, dayHeader, header, body, room, meals):
        # return day object with initial conditions
        self.dayHeader = dayHeader
        self.header = header
        self.body = body
        self.room = room
        self.meals = meals

    # example of header: "Day 2 / Johannesburg, South Africa to Maun, Botswana"
    # example of body: "Today you will be met ... afternoon at leisure."
    # example of footer: "Intercontinental Hotel (Deluxe Room)"
    # example of meals: "B/L/D"


class Transfer:
    def __init__(self):
        self.size = 0

    legList = []


class TransferLeg:
    def __init__(self, orig, dest, mode):
        # return transfer leg object with initial conditions
        self.orig = orig
        self.dest = dest
        self.mode = mode
