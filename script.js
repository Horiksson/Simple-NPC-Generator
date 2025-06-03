// Data for NPC generation
const races = [
    'Human', 'Elf', 'Dwarf', 'Halfling', 'Gnome', 'Half-Orc', 'Tiefling', 'Dragonborn'
];

const classes = [
    'Fighter', 'Wizard', 'Cleric', 'Rogue', 'Ranger', 'Paladin', 'Bard', 'Druid', 'Monk', 'Barbarian'
];

const backgrounds = [
    'Acolyte', 'Criminal', 'Folk Hero', 'Noble', 'Sage', 'Soldier', 'Urchin', 'Guild Artisan'
];

const personalityTraits = [
    'Brave and courageous in the face of danger',
    'Quiet and reserved, preferring to observe rather than speak',
    'Outgoing and friendly, always ready to make new friends',
    'Suspicious of strangers and slow to trust',
    'Curious and eager to learn about the world',
    'Practical and down-to-earth, focused on survival',
    'Charismatic and persuasive, able to talk their way out of trouble',
    'Mysterious and enigmatic, keeping their true nature hidden'
];

const physicalDescriptions = [
    'Tall and imposing, with a commanding presence',
    'Short and stocky, with a sturdy build',
    'Slender and graceful, moving with natural elegance',
    'Muscular and athletic, clearly no stranger to physical labor',
    'Average height and build, easily blending into crowds',
    'Distinctive features that make them stand out in any crowd',
    'Well-groomed and well-dressed, clearly concerned with appearance',
    'Rough around the edges, with scars and weathered features'
];

// Class stat priorities for D&D 5E
const classStatPriority = {
    Fighter:   ['str', 'con', 'dex', 'wis', 'cha', 'int'],
    Wizard:    ['int', 'con', 'dex', 'wis', 'cha', 'str'],
    Cleric:    ['wis', 'con', 'str', 'dex', 'cha', 'int'],
    Rogue:     ['dex', 'int', 'con', 'wis', 'cha', 'str'],
    Ranger:    ['dex', 'wis', 'con', 'str', 'int', 'cha'],
    Paladin:   ['str', 'cha', 'con', 'wis', 'dex', 'int'],
    Bard:      ['cha', 'dex', 'con', 'wis', 'int', 'str'],
    Druid:     ['wis', 'con', 'dex', 'int', 'str', 'cha'],
    Monk:      ['dex', 'wis', 'con', 'str', 'int', 'cha'],
    Barbarian: ['str', 'con', 'dex', 'wis', 'cha', 'int']
};

// Racial bonuses for D&D 5E
const racialBonuses = {
    Human:     { str: 1, dex: 1, con: 1, int: 1, wis: 1, cha: 1 },
    Elf:       { dex: 2 },
    Dwarf:     { con: 2 },
    Halfling:  { dex: 2 },
    Gnome:     { int: 2 },
    'Half-Orc': { str: 2, con: 1 },
    Tiefling:  { cha: 2, int: 1 },
    Dragonborn: { str: 2, cha: 1 }
};

// Subraces and their bonuses for D&D 5E
const subraces = {
    Elf: [
        { name: 'High Elf', bonuses: { int: 1 } },
        { name: 'Wood Elf', bonuses: { wis: 1 } },
        { name: 'Dark Elf (Drow)', bonuses: { cha: 1 } }
    ],
    Dwarf: [
        { name: 'Hill Dwarf', bonuses: { wis: 1 } },
        { name: 'Mountain Dwarf', bonuses: { str: 2 } }
    ],
    Halfling: [
        { name: 'Lightfoot', bonuses: { cha: 1 } },
        { name: 'Stout', bonuses: { con: 1 } }
    ],
    Gnome: [
        { name: 'Forest Gnome', bonuses: { dex: 1 } },
        { name: 'Rock Gnome', bonuses: { con: 1 } }
    ]
    // Other races do not have subraces in PHB
};

// Race-specific physical descriptions
const racePhysicalDescriptions = {
    Human: [
        'Average height (5\'0\" to 7\'0\"), weight 120-200 lbs, hair color ranges from black to blonde, body type varies from lean to muscular.',
        'Tall (5\'6\" to 7\'6\"), weight 140-220 lbs, athletic build, dark hair, broad shoulders.',
        'Short (4\'6\" to 6\'0\"), weight 100-180 lbs, stocky build, red hair, sturdy frame.',
        'Medium height (5\'0\" to 7\'0\"), weight 110-190 lbs, slender build, brown hair, graceful posture.',
        'Tall (5\'6\" to 7\'6\"), weight 150-240 lbs, muscular build, blonde hair, imposing presence.',
        'Short (4\'6\" to 6\'0\"), weight 90-170 lbs, lean build, black hair, agile frame.',
        'Medium height (5\'0\" to 7\'0\"), weight 130-210 lbs, athletic build, auburn hair, well-proportioned.',
        'Tall (5\'6\" to 7\'6\"), weight 160-250 lbs, robust build, gray hair, commanding stature.'
    ],
    Elf: [
        'Tall (5\'2\" to 6\'6\"), weight 90-160 lbs, slender build, silver hair, graceful and ethereal.',
        'Medium height (5\'0\" to 6\'0\"), weight 80-150 lbs, lithe build, golden hair, elegant posture.',
        'Tall (5\'2\" to 6\'6\"), weight 95-170 lbs, athletic build, black hair, poised and agile.',
        'Medium height (5\'0\" to 6\'0\"), weight 85-155 lbs, slender build, white hair, delicate features.',
        'Tall (5\'2\" to 6\'6\"), weight 90-165 lbs, lean build, copper hair, fluid movements.',
        'Medium height (5\'0\" to 6\'0\"), weight 80-150 lbs, graceful build, blue-black hair, serene expression.',
        'Tall (5\'2\" to 6\'6\"), weight 85-160 lbs, wiry build, green-tinted hair, otherworldly aura.',
        'Medium height (5\'0\" to 6\'0\"), weight 80-150 lbs, delicate build, purple hair, mystical presence.'
    ],
    Dwarf: [
        'Short (3\'6\" to 4\'6\"), weight 130-200 lbs, stocky build, brown hair, broad shoulders.',
        'Short (3\'6\" to 4\'6\"), weight 140-210 lbs, muscular build, black hair, sturdy frame.',
        'Short (3\'6\" to 4\'6\"), weight 135-205 lbs, robust build, red hair, thick limbs.',
        'Short (3\'6\" to 4\'6\"), weight 130-200 lbs, stout build, gray hair, solid posture.',
        'Short (3\'6\" to 4\'6\"), weight 145-220 lbs, burly build, blonde hair, powerful presence.',
        'Short (3\'6\" to 4\'6\"), weight 135-205 lbs, compact build, auburn hair, resilient frame.',
        'Short (3\'6\" to 4\'6\"), weight 140-215 lbs, heavy build, white hair, imposing stature.',
        'Short (3\'6\" to 4\'6\"), weight 135-210 lbs, solid build, copper hair, unyielding posture.'
    ],
    Halfling: [
        'Very short (2\'6\" to 3\'6\"), weight 30-60 lbs, slim build, brown hair, nimble frame.',
        'Very short (2\'6\" to 3\'6\"), weight 25-55 lbs, petite build, blonde hair, delicate features.',
        'Very short (2\'6\" to 3\'6\"), weight 30-60 lbs, wiry build, black hair, quick movements.',
        'Very short (2\'6\" to 3\'6\"), weight 25-55 lbs, slight build, red hair, agile posture.',
        'Very short (2\'6\" to 3\'6\"), weight 30-60 lbs, lean build, auburn hair, sprightly demeanor.',
        'Very short (2\'6\" to 3\'6\"), weight 25-55 lbs, compact build, gray hair, resilient frame.',
        'Very short (2\'6\" to 3\'6\"), weight 30-60 lbs, slender build, white hair, graceful presence.',
        'Very short (2\'6\" to 3\'6\"), weight 25-55 lbs, tiny build, copper hair, lively expression.'
    ],
    Gnome: [
        'Very short (2\'6\" to 3\'6\"), weight 35-65 lbs, wiry build, brown hair, quick and agile.',
        'Very short (2\'6\" to 3\'6\"), weight 30-60 lbs, slim build, blonde hair, delicate features.',
        'Very short (2\'6\" to 3\'6\"), weight 35-65 lbs, compact build, black hair, sprightly frame.',
        'Very short (2\'6\" to 3\'6\"), weight 30-60 lbs, petite build, red hair, nimble movements.',
        'Very short (2\'6\" to 3\'6\"), weight 35-65 lbs, slight build, auburn hair, lively posture.',
        'Very short (2\'6\" to 3\'6\"), weight 30-60 lbs, lean build, gray hair, resilient frame.',
        'Very short (2\'6\" to 3\'6\"), weight 35-65 lbs, tiny build, white hair, graceful presence.',
        'Very short (2\'6\" to 3\'6\"), weight 30-60 lbs, delicate build, copper hair, playful expression.'
    ],
    'Half-Orc': [
        'Tall (5\'6\" to 7\'6\"), weight 180-280 lbs, muscular build, black hair, imposing presence.',
        'Tall (5\'6\" to 7\'6\"), weight 170-270 lbs, robust build, brown hair, powerful frame.',
        'Tall (5\'6\" to 7\'6\"), weight 190-290 lbs, burly build, red hair, intimidating stature.',
        'Tall (5\'6\" to 7\'6\"), weight 180-280 lbs, heavy build, gray hair, commanding posture.',
        'Tall (5\'6\" to 7\'6\"), weight 200-300 lbs, solid build, blonde hair, resilient frame.',
        'Tall (5\'6\" to 7\'6\"), weight 190-290 lbs, sturdy build, auburn hair, unyielding presence.',
        'Tall (5\'6\" to 7\'6\"), weight 180-280 lbs, broad build, white hair, formidable expression.',
        'Tall (5\'6\" to 7\'6\"), weight 200-300 lbs, massive build, copper hair, dominant posture.'
    ],
    Tiefling: [
        'Medium height (5\'0\" to 6\'0\"), weight 100-180 lbs, slender build, black hair, infernal features.',
        'Medium height (5\'0\" to 6\'0\"), weight 95-175 lbs, lithe build, red hair, demonic aura.',
        'Medium height (5\'0\" to 6\'0\"), weight 100-180 lbs, wiry build, purple hair, otherworldly presence.',
        'Medium height (5\'0\" to 6\'0\"), weight 95-175 lbs, slim build, white hair, ethereal expression.',
        'Medium height (5\'0\" to 6\'0\"), weight 100-180 lbs, lean build, blue-black hair, mystical posture.',
        'Medium height (5\'0\" to 6\'0\"), weight 95-175 lbs, delicate build, silver hair, haunting frame.',
        'Medium height (5\'0\" to 6\'0\"), weight 100-180 lbs, graceful build, green-tinted hair, eerie presence.',
        'Medium height (5\'0\" to 6\'0\"), weight 95-175 lbs, slight build, copper hair, enigmatic expression.'
    ],
    Dragonborn: [
        'Tall (5\'6\" to 7\'6\"), weight 200-300 lbs, muscular build, scales in various colors, imposing presence.',
        'Tall (5\'6\" to 7\'6\"), weight 190-290 lbs, robust build, scales in various colors, powerful frame.',
        'Tall (5\'6\" to 7\'6\"), weight 210-310 lbs, burly build, scales in various colors, intimidating stature.',
        'Tall (5\'6\" to 7\'6\"), weight 200-300 lbs, heavy build, scales in various colors, commanding posture.',
        'Tall (5\'6\" to 7\'6\"), weight 220-320 lbs, solid build, scales in various colors, resilient frame.',
        'Tall (5\'6\" to 7\'6\"), weight 210-310 lbs, sturdy build, scales in various colors, unyielding presence.',
        'Tall (5\'6\" to 7\'6\"), weight 200-300 lbs, broad build, scales in various colors, formidable expression.',
        'Tall (5\'6\" to 7\'6\"), weight 220-320 lbs, massive build, scales in various colors, dominant posture.'
    ]
};

// Add gender to the NPC generation
const genders = ['Male', 'Female'];

// Function to get random element from array
function getRandomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
}

// Function to generate ability scores based on class priorities
function generateAbilityScoresForClass(characterClass) {
    const standardArray = [15, 14, 13, 12, 10, 8];
    const priorities = classStatPriority[characterClass] || ['str', 'dex', 'con', 'int', 'wis', 'cha'];
    // Sort the standard array from highest to lowest
    const sortedScores = [...standardArray].sort((a, b) => b - a);
    // Assign scores to stats based on priority
    const abilities = {};
    for (let i = 0; i < priorities.length; i++) {
        abilities[priorities[i]] = sortedScores[i];
    }
    return abilities;
}

// Function to get a random subrace for a given race
function getRandomSubrace(race) {
    if (subraces[race]) {
        return getRandomElement(subraces[race]);
    }
    return null;
}

// Function to apply racial and subrace bonuses
function applyRacialBonuses(abilities, race, subraceObj) {
    const bonuses = racialBonuses[race] || {};
    const result = { ...abilities };
    // Apply base race bonuses
    for (const stat in bonuses) {
        if (result[stat] !== undefined) {
            result[stat] += bonuses[stat];
        }
    }
    // Apply subrace bonuses
    if (subraceObj && subraceObj.bonuses) {
        for (const stat in subraceObj.bonuses) {
            if (result[stat] !== undefined) {
                result[stat] += subraceObj.bonuses[stat];
            }
        }
    }
    // Cap at 20
    for (const stat in result) {
        if (result[stat] > 20) result[stat] = 20;
    }
    return result;
}

// Function to generate a random name
function generateName(race, gender) {
    const nameLists = {
        Human: {
            male: {
                firstNames: [
                    'Aldric', 'Benedict', 'Darius', 'Frederick', 'Harold', 'Julian',
                    'Lucian', 'Nathaniel', 'Percival', 'Sebastian', 'Ulysses', 'William',
                    'Xavier', 'Zachary'
                ],
                lastNames: [
                    'Blackwood', 'Stormwind', 'Ironheart', 'Shadowbane', 'Brightblade',
                    'Nightshade', 'Silverleaf', 'Goldcrest', 'Firebrand', 'Moonwhisper',
                    'Starweaver', 'Thunderforge', 'Ravencrest', 'Dawnbringer', 'Frostwind'
                ]
            },
            female: {
                firstNames: [
                    'Cassandra', 'Eleanor', 'Gwendolyn', 'Isabella', 'Katherine',
                    'Margaret', 'Ophelia', 'Rosalind', 'Theodora', 'Victoria',
                    'Yvette', 'Adelaide', 'Beatrice', 'Cecilia', 'Diana'
                ],
                lastNames: [
                    'Blackwood', 'Stormwind', 'Ironheart', 'Shadowbane', 'Brightblade',
                    'Nightshade', 'Silverleaf', 'Goldcrest', 'Firebrand', 'Moonwhisper',
                    'Starweaver', 'Thunderforge', 'Ravencrest', 'Dawnbringer', 'Frostwind'
                ]
            }
        },
        Elf: {
            male: {
                firstNames: [
                    'Aelrindel', 'Thalion', 'Soryn', 'Fenian', 'Tirian', 'Orist',
                    'Sirael', 'Aeris', 'Eldrin', 'Galadriel', 'Legolas', 'Thranduil',
                    'Elrond', 'Celeborn', 'Glorfindel'
                ],
                lastNames: [
                    'Moonwhisper', 'Stardancer', 'Nightbreeze', 'Silverleaf', 'Dawnblade',
                    'Shadowweaver', 'Frostwind', 'Sunstrider', 'Moonblade', 'Starborn',
                    'Nightshade', 'Silverwind', 'Dawnwhisper', 'Shadowdancer', 'Frostblade'
                ]
            },
            female: {
                firstNames: [
                    'Sylthiel', 'Lirael', 'Elyra', 'Myriil', 'Zariel', 'Ithilwen',
                    'Rynna', 'Vanya', 'Serelis', 'Yllairies', 'Nuala', 'Arwen',
                    'Galadriel', 'Celebrian', 'Luthien'
                ],
                lastNames: [
                    'Moonwhisper', 'Stardancer', 'Nightbreeze', 'Silverleaf', 'Dawnblade',
                    'Shadowweaver', 'Frostwind', 'Sunstrider', 'Moonblade', 'Starborn',
                    'Nightshade', 'Silverwind', 'Dawnwhisper', 'Shadowdancer', 'Frostblade'
                ]
            }
        },
        Dwarf: {
            male: {
                firstNames: [
                    'Bramdir', 'Durgan', 'Kragni', 'Thrainik', 'Garnor', 'Hildrak',
                    'Kurn', 'Marnor', 'Dorn', 'Rurik', 'Bofrak', 'Keldrin',
                    'Orsik', 'Vondal', 'Barben'
                ],
                lastNames: [
                    'Ironbeard', 'Stonefist', 'Goldaxe', 'Silverhammer', 'Bronzebeard',
                    'Fireforge', 'Steelheart', 'Rockbrow', 'Ironfoot', 'Stoneheart',
                    'Goldbeard', 'Silverfist', 'Bronzeaxe', 'Firebrow', 'Steelforge'
                ]
            },
            female: {
                firstNames: [
                    'Bralda', 'Tholda', 'Gimra', 'Dagna', 'Eldeth', 'Frida',
                    'Hilda', 'Kara', 'Lona', 'Mara', 'Nora', 'Runa',
                    'Thora', 'Vera', 'Ylva'
                ],
                lastNames: [
                    'Ironbeard', 'Stonefist', 'Goldaxe', 'Silverhammer', 'Bronzebeard',
                    'Fireforge', 'Steelheart', 'Rockbrow', 'Ironfoot', 'Stoneheart',
                    'Goldbeard', 'Silverfist', 'Bronzeaxe', 'Firebrow', 'Steelforge'
                ]
            }
        },
        Halfling: {
            male: {
                firstNames: [
                    'Perrin', 'Lyle', 'Milo', 'Roscoe', 'Eldon', 'Finnan',
                    'Osborn', 'Reed', 'Tobias', 'Zane', 'Bilbo', 'Frodo',
                    'Samwise', 'Pippin', 'Merry'
                ],
                lastNames: [
                    'Goodbarrel', 'Greenhill', 'Underhill', 'Baggins', 'Took',
                    'Brandybuck', 'Proudfoot', 'Boffin', 'Bolger', 'Bracegirdle',
                    'Brockhouse', 'Brownlock', 'Bunce', 'Burrowes', 'Chubb'
                ]
            },
            female: {
                firstNames: [
                    'Cora', 'Seraphina', 'Tegan', 'Bramble', 'Jillian', 'Wenna',
                    'Lidda', 'Mira', 'Shaena', 'Vani', 'Daisy', 'Primula',
                    'Rosie', 'Lily', 'Marigold'
                ],
                lastNames: [
                    'Goodbarrel', 'Greenhill', 'Underhill', 'Baggins', 'Took',
                    'Brandybuck', 'Proudfoot', 'Boffin', 'Bolger', 'Bracegirdle',
                    'Brockhouse', 'Brownlock', 'Bunce', 'Burrowes', 'Chubb'
                ]
            }
        },
        Gnome: {
            male: {
                firstNames: [
                    'Alston', 'Boddynock', 'Brocc', 'Burgell', 'Dimble', 'Eldon',
                    'Erky', 'Fonkin', 'Frug', 'Gerbo', 'Gimble', 'Glim',
                    'Jebeddo', 'Kellen', 'Namfoodle'
                ],
                lastNames: [
                    'Beren', 'Daergel', 'Folkor', 'Garrick', 'Nackle', 'Murnig',
                    'Ningel', 'Raulnor', 'Scheppen', 'Timbers', 'Turen', 'Waggletop',
                    'Zant', 'Zilker', 'Zipper'
                ]
            },
            female: {
                firstNames: [
                    'Zanna', 'Zed', 'Zilna', 'Zook', 'Bina', 'Dina',
                    'Fina', 'Gina', 'Lina', 'Mina', 'Nina', 'Pina',
                    'Rina', 'Tina', 'Vina'
                ],
                lastNames: [
                    'Beren', 'Daergel', 'Folkor', 'Garrick', 'Nackle', 'Murnig',
                    'Ningel', 'Raulnor', 'Scheppen', 'Timbers', 'Turen', 'Waggletop',
                    'Zant', 'Zilker', 'Zipper'
                ]
            }
        },
        'Half-Orc': {
            male: {
                firstNames: [
                    'Argran', 'Braak', 'Crug', 'Droog', 'Ekk', 'Feng',
                    'Gell', 'Henk', 'Irg', 'Jot', 'Krusk', 'Lug',
                    'Mhurren', 'Ront', 'Shump'
                ],
                lastNames: [
                    'Bonebreaker', 'Skullsplitter', 'Ironjaw', 'Bloodaxe', 'Gorefist',
                    'Deathgrip', 'Skullcrusher', 'Bonechewer', 'Ironhide', 'Bloodfist',
                    'Gorejaw', 'Deathaxe', 'Skullbreaker', 'Bonesplitter', 'Ironfist'
                ]
            },
            female: {
                firstNames: [
                    'Thokk', 'Ulg', 'Varg', 'Wort', 'Xulg', 'Yarg',
                    'Zog', 'Zug', 'Zurk', 'Zurt', 'Zut', 'Grakka',
                    'Hroka', 'Kroka', 'Mroka'
                ],
                lastNames: [
                    'Bonebreaker', 'Skullsplitter', 'Ironjaw', 'Bloodaxe', 'Gorefist',
                    'Deathgrip', 'Skullcrusher', 'Bonechewer', 'Ironhide', 'Bloodfist',
                    'Gorejaw', 'Deathaxe', 'Skullbreaker', 'Bonesplitter', 'Ironfist'
                ]
            }
        },
        Tiefling: {
            male: {
                firstNames: [
                    'Akmenos', 'Amnon', 'Barakas', 'Damakos', 'Ekemon', 'Iados',
                    'Kairon', 'Leucis', 'Melech', 'Mordai', 'Morthos', 'Pelaios',
                    'Skamos', 'Therai', 'Zeth'
                ],
                lastNames: [
                    'Art', 'Carrion', 'Chant', 'Creed', 'Despair', 'Excellence',
                    'Fear', 'Glory', 'Hope', 'Ideal', 'Music', 'Nowhere',
                    'Poetry', 'Quest', 'Random'
                ]
            },
            female: {
                firstNames: [
                    'Akta', 'Anakis', 'Bryseis', 'Criella', 'Damaia', 'Ea',
                    'Kallista', 'Lerissa', 'Makaria', 'Nemeia', 'Orianna', 'Phelaia',
                    'Rieta', 'Sereia', 'Tana'
                ],
                lastNames: [
                    'Art', 'Carrion', 'Chant', 'Creed', 'Despair', 'Excellence',
                    'Fear', 'Glory', 'Hope', 'Ideal', 'Music', 'Nowhere',
                    'Poetry', 'Quest', 'Random'
                ]
            }
        },
        Dragonborn: {
            male: {
                firstNames: [
                    'Arjhan', 'Balasar', 'Bharash', 'Donaar', 'Ghesh', 'Heskan',
                    'Kriv', 'Medrash', 'Mehen', 'Nadarr', 'Pandjed', 'Patrin',
                    'Rhogar', 'Shamash', 'Shedinn'
                ],
                lastNames: [
                    'Clethtinthiallor', 'Daardendrian', 'Delmirev', 'Drachedandion',
                    'Fenkenkabradon', 'Kepeshkmolik', 'Kerrhylon', 'Kimbatuul',
                    'Linxakasendalor', 'Myastan', 'Nemmonis', 'Norixius',
                    'Ophinshtalajiir', 'Prexijandilin', 'Shestendeliath'
                ]
            },
            female: {
                firstNames: [
                    'Akra', 'Biri', 'Daar', 'Farideh', 'Harann', 'Havilar',
                    'Jheri', 'Kava', 'Korinn', 'Mishann', 'Nala', 'Perra',
                    'Raiann', 'Sora', 'Surina'
                ],
                lastNames: [
                    'Clethtinthiallor', 'Daardendrian', 'Delmirev', 'Drachedandion',
                    'Fenkenkabradon', 'Kepeshkmolik', 'Kerrhylon', 'Kimbatuul',
                    'Linxakasendalor', 'Myastan', 'Nemmonis', 'Norixius',
                    'Ophinshtalajiir', 'Prexijandilin', 'Shestendeliath'
                ]
            }
        }
    };

    const nameList = nameLists[race] || nameLists.Human;
    const genderList = nameList[gender.toLowerCase()];
    return `${getRandomElement(genderList.firstNames)} ${getRandomElement(genderList.lastNames)}`;
}

// Function to generate a random number within a range
function getRandomInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Function to generate a specific height within a range
function generateSpecificHeight(heightRange, isFemale) {
    // Extract min and max heights from the range string (e.g., "5'0\" to 7'0\"")
    const match = heightRange.match(/(\d+)'(\d+)" to (\d+)'(\d+)"/);
    if (!match) return heightRange;

    const minFeet = parseInt(match[1]);
    const minInches = parseInt(match[2]);
    const maxFeet = parseInt(match[3]);
    const maxInches = parseInt(match[4]);

    // Convert to total inches for easier calculation
    const minTotalInches = minFeet * 12 + minInches;
    const maxTotalInches = maxFeet * 12 + maxInches;

    // Generate random height in inches
    let randomInches = getRandomInRange(minTotalInches, maxTotalInches);
    
    // Reduce height by 10% for female NPCs
    if (isFemale) {
        randomInches = Math.floor(randomInches * 0.9);
    }
    
    // Convert back to feet and inches
    const feet = Math.floor(randomInches / 12);
    const inches = randomInches % 12;

    return `${feet}'${inches}"`;
}

// Function to generate a specific weight within a range
function generateSpecificWeight(weightRange, isFemale) {
    // Extract min and max weights from the range string (e.g., "120-200 lbs")
    const match = weightRange.match(/(\d+)-(\d+) lbs/);
    if (!match) return weightRange;

    const minWeight = parseInt(match[1]);
    const maxWeight = parseInt(match[2]);

    // Generate random weight
    let randomWeight = getRandomInRange(minWeight, maxWeight);
    
    // Reduce weight by 10% for female NPCs
    if (isFemale) {
        randomWeight = Math.floor(randomWeight * 0.9);
    }
    
    return `${randomWeight} lbs`;
}

// Function to get a race-specific physical description with specific measurements
function getRacePhysicalDescription(race, isFemale) {
    const baseDescription = getRandomElement(racePhysicalDescriptions[race] || racePhysicalDescriptions.Human);
    
    // Extract height and weight ranges
    const heightMatch = baseDescription.match(/([^,]+), weight/);
    const weightMatch = baseDescription.match(/weight ([^,]+),/);
    
    if (heightMatch && weightMatch) {
        const heightRange = heightMatch[1];
        const weightRange = weightMatch[1];
        
        // Generate specific measurements
        const specificHeight = generateSpecificHeight(heightRange, isFemale);
        const specificWeight = generateSpecificWeight(weightRange, isFemale);
        
        // Replace the ranges with specific measurements
        return baseDescription
            .replace(heightRange, specificHeight)
            .replace(weightRange, specificWeight);
    }
    
    return baseDescription;
}

// Function to populate dropdown menus
function populateDropdowns() {
    const raceSelect = document.getElementById('raceSelect');
    const genderSelect = document.getElementById('genderSelect');
    const classSelect = document.getElementById('classSelect');

    // Populate race dropdown
    races.forEach(race => {
        const option = document.createElement('option');
        option.value = race;
        option.textContent = race;
        raceSelect.appendChild(option);
    });

    // Populate gender dropdown
    genders.forEach(gender => {
        const option = document.createElement('option');
        option.value = gender;
        option.textContent = gender;
        genderSelect.appendChild(option);
    });

    // Populate class dropdown
    classes.forEach(characterClass => {
        const option = document.createElement('option');
        option.value = characterClass;
        option.textContent = characterClass;
        classSelect.appendChild(option);
    });
}

// Function to check if all selections are made
function checkSelections() {
    const raceSelect = document.getElementById('raceSelect');
    const genderSelect = document.getElementById('genderSelect');
    const classSelect = document.getElementById('classSelect');
    const generateBtn = document.getElementById('generateBtn');

    if (raceSelect && genderSelect && classSelect && generateBtn) {
        generateBtn.disabled = !(raceSelect.value && genderSelect.value && classSelect.value);
    }
}

// Function to generate a random NPC (original functionality)
function generateRandomNPC() {
    const race = getRandomElement(races);
    const subraceObj = getRandomSubrace(race);
    const subrace = subraceObj ? subraceObj.name : null;
    const characterClass = getRandomElement(classes);
    const background = getRandomElement(backgrounds);
    const personality = getRandomElement(personalityTraits);
    const gender = getRandomElement(genders);
    const isFemale = gender === 'Female';
    const description = getRacePhysicalDescription(race, isFemale);
    let abilities = generateAbilityScoresForClass(characterClass);
    abilities = applyRacialBonuses(abilities, race, subraceObj);
    const name = generateName(race, gender);

    return {
        name,
        race,
        subrace,
        gender,
        characterClass,
        background,
        personality,
        description,
        abilities
    };
}

// Function to generate a complete NPC with selected options
function generateSelectedNPC() {
    const race = document.getElementById('raceSelect').value;
    const gender = document.getElementById('genderSelect').value;
    const characterClass = document.getElementById('classSelect').value;
    
    const subraceObj = getRandomSubrace(race);
    const subrace = subraceObj ? subraceObj.name : null;
    const background = getRandomElement(backgrounds);
    const personality = getRandomElement(personalityTraits);
    const isFemale = gender === 'Female';
    const description = getRacePhysicalDescription(race, isFemale);
    let abilities = generateAbilityScoresForClass(characterClass);
    abilities = applyRacialBonuses(abilities, race, subraceObj);
    const name = generateName(race, gender);

    return {
        name,
        race,
        subrace,
        gender,
        characterClass,
        background,
        personality,
        description,
        abilities
    };
}

// Function to update the UI with NPC data
function updateNPCDisplay(npc) {
    document.getElementById('npcName').textContent = npc.name;
    let raceText = npc.race;
    if (npc.subrace) {
        raceText = `${npc.subrace} ${npc.race}`;
    }
    document.getElementById('npcRace').textContent = `${raceText} • ${npc.characterClass} • ${npc.gender}`;
    document.getElementById('npcDescription').textContent = npc.description;
    document.getElementById('npcPersonality').textContent = npc.personality;
    document.getElementById('npcBackground').textContent = `Background: ${npc.background}`;

    // Update ability scores
    document.getElementById('strScore').textContent = npc.abilities.str;
    document.getElementById('dexScore').textContent = npc.abilities.dex;
    document.getElementById('conScore').textContent = npc.abilities.con;
    document.getElementById('intScore').textContent = npc.abilities.int;
    document.getElementById('wisScore').textContent = npc.abilities.wis;
    document.getElementById('chaScore').textContent = npc.abilities.cha;
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    // Populate dropdowns
    populateDropdowns();
    
    // Set up event listeners for dropdowns
    const raceSelect = document.getElementById('raceSelect');
    const genderSelect = document.getElementById('genderSelect');
    const classSelect = document.getElementById('classSelect');
    const generateBtn = document.getElementById('generateBtn');
    const randomBtn = document.getElementById('randomBtn');

    if (raceSelect) raceSelect.addEventListener('change', checkSelections);
    if (genderSelect) genderSelect.addEventListener('change', checkSelections);
    if (classSelect) classSelect.addEventListener('change', checkSelections);

    // Set up event listener for generate button
    if (generateBtn) {
        generateBtn.addEventListener('click', () => {
            const npc = generateSelectedNPC();
            updateNPCDisplay(npc);
        });
    }

    // Set up event listener for random button
    if (randomBtn) {
        randomBtn.addEventListener('click', () => {
            const npc = generateRandomNPC();
            updateNPCDisplay(npc);
        });
    }

    // Initial check of selections
    checkSelections();
}); 