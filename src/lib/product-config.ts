export interface SignifyProductMetadata {
  type?: string;
  specs: string[];
  description: string;
}

interface SignifyProduct {
  name: string;
  nl: SignifyProductMetadata;
}

export const signifyProducts: Record<"lamps" | "accessories" | "bridges", Record<string, SignifyProduct>> = {
  lamps: {
    "180053": {
      name: "E27 - slimme lamp - 1050",
      nl: {
        type: "Standaard E27",
        specs: [
          "Tot 1055 lumen",
          "Wit & gekleurd licht"
        ],
        description: "<p>De helderste en meest kleurrijke. Perfect voor grote ruimtes, of kamers waar je de sfeer wilt instellen. E27 basis en A60 vorm.</p><hr/><u><a href='#'>Bekijk de productspecificaties</a></u>"
      }
    },
    "180054": {
      name: "E27 - slimme lamp - 800",
      nl: {
        type: "Standaard E27",
        specs: [
          "Tot 800 lumen",
          "Warm- tot koelwit licht"
        ],
        description: "<p>Van koele tinten tot warme gloed, deze lamp biedt precies het juiste licht voor elk moment van de dag. E27 basis en A60 vorm.</p><hr/><u><a href='#'>Bekijk de productspecificaties</a></u>"
      }
    },
    "180055": {
      name: "GU10 - slimme spot",
      nl: {
        type: "GU10 spotverlichting",
        specs: [
          "Tot 350 lumen",
          "Wit & gekleurd licht"
        ],
        description: "<p>Perfect voor standaard spotlights, deze lamp biedt het volledige spectrum van wit en gekleurd licht. GU10 basis.</p><hr/><u><a href='#'>Bekijk de productspecificaties</a></u>"
      }
    },
    "180056": {
      name: "GU10 - slimme spot",
      nl: {
        type: "GU10 spotverlichting",
        specs: [
          "Tot 350 lumen",
          "Warm- tot koelwit licht"
        ],
        description: "<p>Krijg aanpasbaar warm-naar-koel wit licht in elke standaard spotlight met deze lamp. GU10 basis.</p><u><a href='#'>Bekijk de productspecificaties</a></u>"
      }
    },
    "180057": {
      name: "E27 - Ellipse bulb",
      nl: {
        type: "Lightguide",
        specs: [
          "Tot 500 lumen",
          "Wit & gekleurd licht"
        ],
        description: "<p>Een opvallende lamp. Handgeblazen kristalhelder glas, een reflecterende coating en een interne LED-buis komen samen om unieke lichteffecten te creëren. E27 basis.</p><u><a href='#'>Bekijk de productspecificaties</a></u>"
      }
    },
    "180058": {
      name: "E27 - A60 slimme lamp",
      nl: {
        type: "Filament E27",
        specs: [
          "Tot 500 lumen",
          "Zachtwit licht, vintage lamp"
        ],
        description: "Krijg alle moderne functies van slim licht in een vintage ontwerp. E27 basis en A60 vorm.<br/><u><a href='#'>Bekijk de productspecificaties</a></u>"
      }
    },
    "180059": {
      name: "E27 - ST64 slimme lamp",
      nl: {
        type: "Filament E27",
        specs: [
          "Tot 500 lumen",
          "Zachtwit licht, vintage lamp"
        ],
        description: "Met zijn iconische vorm, gloeiende binnenste spoel, en moderne functies is deze lamp een must-have. E27 basis en ST64 vorm.<br/><u><a href='#'>Bekijk de productspecificaties</a></u>"
      }
    },
    "180060": {
      name: "E27 - G93 globe slimme lamp",
      nl: {
        type: "Filament E27",
        specs: [
          "Tot 500 lumen",
          "Zachtwit licht, vintage lamp"
        ],
        description: "Met zijn gloeiende binnenste spoel en aanpasbaar wit licht combineert deze lamp moderne functies met vintage stijl. E27 basis en G125 vorm.<br/><u><a href='#'>Bekijk de productspecificaties</a></u>"
      }
    },
    "180061": {
      name: "E27 - G93 globe slimme lamp",
      nl: {
        type: "Filament E27",
        specs: [
          "Tot 500 lumen",
          "Zachtwit licht, vintage lamp"
        ],
        description: "De grotere versie van zijn compacte tegenhanger, compleet met de vintage-stijl, gloeiende binnenste spoel. E27 basis en G125 vorm.<br/><u><a href='#'>Bekijk de productspecificaties</a></u>"
      }
    }
  },
  accessories: {
    "180062": {
      name: "Tap dial switch",
      nl: {
        specs: [
          "4 instelbare knoppen",
          "Vereist een Bridge"
        ],
        description: "<p><b>Wat kan je met deze switch?</b></p><p>Bedien tot drie kamers of een zone met elk individuele knop. Draai aan de knop om de lichten te dimmen en helderder te maken. Bevestig het aan de muur, plaats het op een magnetisch oppervlak, of gebruik het als afstandsbediening.</p><hr/><b><a href='#'>Bekjik details</a></b>",
        type: "Schakelaars"
      },
    },
    "180063": {
      name: "Motion sensor",
      nl: {
        specs: [
          "Voor gebruik binnenshuis",
          "Vereist een Bridge"
        ],
        type: "Sensoren",
        description: "<p><b>Wat kan je met deze switch?</b></p><p>Bedien tot drie kamers of een zone met elk individuele knop. Draai aan de knop om de lichten te dimmen en helderder te maken. Bevestig het aan de muur, plaats het op een magnetisch oppervlak, of gebruik het als afstandsbediening.</p><hr/><b><a href='#'>Bekjik details</a></b>"
      }
    }
  },

  bridges: {
    "180064": {
      name: "Bridge",
      nl: {
        specs: [
          "Ontgrendelt alle functies.",
          "Vereist voor accessoires"
        ],
        description: "<p><b>Wat is een Bridge?</b></p><p>Het verbindt met je router voor een snel en betrouwbaar netwerk waar je Hue lampen op vertrouwen voor communicatie. Zonder een Bridge gebruiken je lampen Bluetooth, maar missen ze onze meest geavanceerde functies.</p><hr/><b><a href='#'>Leer meer</a></b>",
      }
    },
  }
}