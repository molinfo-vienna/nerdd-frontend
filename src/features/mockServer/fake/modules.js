import { faker } from "@faker-js/faker"

const taskTypes = [
    "molecular_property_prediction",
    "atom_property_prediction",
    "derivative_prediction",
]
const jobDataTypes = ["text", "number", "boolean"]
const resultDataTypes = ["integer", "float", "text", "boolean"]

const logoUrls = Array.from({ length: 14 }).map(
    (_, i) => `/fake/module-logos/${i + 1}.png`,
)

function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
}

function phrase() {
    return `${capitalize(faker.word.adjective())} ${faker.word.noun()}`
}

function longPhrase() {
    const words = faker.word.words({ count: { min: 1, max: 5 } })
    return `${capitalize(words)}`
}

export function choice() {
    return {
        value: faker.lorem.slug(3),
        label: phrase(),
    }
}

export function generateJobParameter() {
    const type = faker.helpers.arrayElement(jobDataTypes)
    const hasHelpText = faker.datatype.boolean(0.8)
    const isChoices = faker.datatype.boolean()
    const choices = isChoices
        ? Array.from({ length: faker.number.int({ min: 2, max: 5 }) }, () =>
              choice(),
          )
        : undefined

    return {
        name: faker.lorem.slug(3),
        visible_name: phrase(),
        help_text: hasHelpText
            ? faker.lorem.sentence({ min: 8, max: 30 })
            : undefined,
        type,
        choices,
    }
}

export function generateResultProperty(group, level) {
    const visibleName = longPhrase()
    const name = visibleName.replace(/\s/g, "_").toLowerCase()
    const type = faker.helpers.arrayElement(resultDataTypes)
    const visible = faker.datatype.boolean(0.6)
    const sortable = faker.datatype.boolean()
    const hasChoices = faker.datatype.boolean()
    const choices = hasChoices
        ? Array.from(
              {
                  length: faker.number.int({ min: 2, max: 5 }),
              },
              () => choice(),
          )
        : undefined

    return {
        name,
        visible_name: visibleName,
        type,
        palette: faker.lorem.slug(3),
        visible,
        sortable,
        group,
        level,
        choices,
    }
}

export function generatePropertyGroups(numProperties) {
    let current = 0
    let groups = []
    while (current < numProperties) {
        const remaining = numProperties - current
        const numPropertiesInGroup = Math.min(
            remaining,
            faker.number.int({ min: 1, max: 4 }),
        )
        const groupName = numPropertiesInGroup > 1 ? phrase() : undefined
        current += numPropertiesInGroup

        groups = [
            ...groups,
            ...Array.from({ length: numPropertiesInGroup }, () => groupName),
        ]
    }
    return groups
}

export function generatePartner() {
    return {
        name: faker.company.name(),
        logo: "https://via.placeholder.com/150?text=Partner",
    }
}

export function generateContact() {
    return {
        name: faker.person.fullName(),
        email: faker.internet.email(),
    }
}

function generateAboutSection(i, level) {
    faker.seed(i * 100 + level)

    // create a heading of level i if i > 0
    let section = ""
    if (level > 0) {
        const heading = longPhrase()

        // generate some text
        const numParagraphs = faker.number.int({ min: 1, max: 5 })
        const paragraphs = faker.lorem.paragraphs(numParagraphs, "\n\n")

        // generate string with as many hash symbols as the level
        // e.g. level = 3 --> "### Heading"
        const hashes = Array.from({ length: level }, () => "#").join("")

        section = `${hashes} ${heading}\n\n${paragraphs}`
    }

    // with probability 1/level, generate subheadings
    const hasSubSections =
        level < 6 && faker.datatype.boolean(1 / (level + 1) ** 2)
    let subSections = ""
    if (hasSubSections) {
        const numSubparagraphs = faker.number.int({ min: 2, max: 5 })
        const subSectionsList = Array.from(
            { length: numSubparagraphs },
            (_, i) => generateAboutSection(i, level + 1),
        )
        subSections = subSectionsList.join("\n\n")
    }

    return `${section}\n\n${subSections}`
}

function generateAbout(i) {
    return generateAboutSection(i, 0)
}

function generateJournal() {
    const fields = [
        "Medicine",
        "Engineering",
        "Biology",
        "Economics",
        "Physics",
        "Computer Science",
        "Psychology",
    ]
    const types = ["Journal", "Review", "Bulletin", "Transactions", "Quarterly"]
    const scopes = [
        "International",
        "European",
        "Advanced",
        "Applied",
        "Theoretical",
        "Global",
    ]
    const adjectives = [
        "Modern",
        "Current",
        "Innovative",
        "Contemporary",
        "Emerging",
    ]

    const field = faker.helpers.arrayElement(fields)
    const type = faker.helpers.arrayElement(types)
    const scope = faker.helpers.arrayElement(scopes)
    const adjective = faker.helpers.arrayElement(adjectives)

    // Randomly choose a format
    const formats = [
        `${scope} ${type} of ${field}`,
        `${adjective} ${type} of ${field}`,
        `${type} of ${scope} ${field}`,
        `${adjective} ${scope} ${type}`,
    ]

    return faker.helpers.arrayElement(formats)
}

function generateDOI() {
    const registrant = faker.number.int({ min: 1000, max: 9999 })
    const suffixLength = faker.number.int({ min: 9, max: 16 })
    const suffix = faker.string.alphanumeric(suffixLength)

    return `10.${registrant}/${suffix}`
}

export function generateModuleConfig(i) {
    faker.seed(i)

    const task = faker.helpers.arrayElement(taskTypes)

    const numPartners = faker.number.int({ min: 1, max: 5 })
    const numContacts = faker.number.int({ min: 1, max: 3 })
    const numAuthors = faker.number.int({ min: 2, max: 7 })
    const numJobParameters = faker.number.int({ min: 0, max: 7 })
    const numResultProperties = faker.number.int({ min: 1, max: 20 })
    const visibleName = capitalize(faker.word.words(1))

    const groups = generatePropertyGroups(numResultProperties)

    // typical result properties
    const nameProperty = {
        name: "name",
        type: "text",
        visible_name: "Name",
        visible: true,
        sortable: true,
    }

    // add input smiles column
    const inputSmilesProperty = {
        name: "input_smiles",
        type: "text",
        visible_name: "Input SMILES",
        visible: false,
        sortable: true,
    }

    // add filtered smiles column
    const filteredSmilesProperty = {
        name: "preprocessed_smiles",
        type: "text",
        visible_name: "Processed SMILES",
        visible: false,
        sortable: true,
    }

    // add image column
    const imageProperty = {
        name: "image",
        type: "image",
        visible_name: "2D structure",
        visible: true,
        sortable: false,
    }

    const defaultProperties = [
        nameProperty,
        inputSmilesProperty,
        filteredSmilesProperty,
        imageProperty,
    ]

    // we assign a random portion of the *last* columns to be atom- or
    // derivative-related columns
    let levels = []
    if (task === "molecular_property_prediction") {
        levels = Array.from({ length: numResultProperties }, () => undefined)
    } else {
        // decide how many columns should be atom- or derivative-related
        const ratio = faker.number.float({ min: 0.5, max: 1 })
        const numLevelColumns = Math.floor(numResultProperties * ratio)
        const start = numResultProperties - numLevelColumns

        // make sure that no group is split
        const cutGroup = start < groups.length ? groups[start] : undefined
        const cutIndex =
            cutGroup !== undefined ? groups.indexOf(cutGroup) : start

        const level =
            task === "atom_property_prediction" ? "atom" : "derivative"

        levels = Array.from({ length: numResultProperties }, (_, i) =>
            i >= cutIndex ? level : undefined,
        )
    }

    return {
        rank: faker.number.int({ min: 0, max: 100 }),
        name: faker.lorem.slug(4),
        task,
        visible_name: visibleName,
        description: faker.lorem.paragraphs(2, "\n\n"),
        example_smiles:
            "CCOC(=O)N1CCN(CC1)C2=C(C(=O)C2=O)N3CCN(CC3)C4=CC=C(C=C4)OC example smiles",
        title: faker.lorem.sentence({ min: 5, max: 8 }),
        logo_title: faker.music.songName(),
        logo_caption: faker.lorem.sentence({ min: 5, max: 8 }),
        logo: logoUrls[faker.number.int({ min: 0, max: logoUrls.length - 1 })],
        partners: Array.from({ length: numPartners }, () => generatePartner()),
        contact: Array.from({ length: numContacts }, () => generateContact()),
        job_parameters: Array.from({ length: numJobParameters }, () =>
            generateJobParameter(),
        ),
        publication: {
            title: faker.lorem.sentence({ min: 12, max: 22 }),
            authors: Array.from({ length: numAuthors }, () => ({
                firstName: faker.person.firstName(),
                lastName: faker.person.lastName(),
            })),
            journal: generateJournal(),
            year: faker.date.past({ years: 10 }).getFullYear(),
            doi: generateDOI(),
        },
        result_properties: [
            ...defaultProperties,
            ...groups.map((g, i) => generateResultProperty(g, levels[i])),
        ],
        about: generateAbout(i),
    }
}

export function generateModuleConfigArray(num) {
    return Array.from({ length: num }, (_, i) => generateModuleConfig(i))
}

export function generateModuleConfigDict(num) {
    const moduleConfigs = generateModuleConfigArray(num)

    return Object.fromEntries(moduleConfigs.map((c) => [c.name, c]))
}
