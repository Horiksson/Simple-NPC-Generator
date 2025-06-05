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

const backgroundDefinitions = {
    'Acolyte': {
        description: 'You trained in a religious organization or temple, learning sacred rites and performing religious ceremonies. You have a deep connection to your faith and the divine.',
        bonuses: {
            skills: ['Insight', 'Religion'],
            languages: 2,
            equipment: 'Holy symbol, prayer book, 5 sticks of incense, vestments, common clothes, belt pouch with 15 gp'
        }
    },
    'Criminal': {
        description: 'You lived a life of crime, learning to survive on the streets and in the shadows. You have contacts in the criminal underworld and know how to get things done discreetly.',
        bonuses: {
            skills: ['Deception', 'Stealth'],
            tools: 'Thieves\' tools',
            equipment: 'Crowbar, dark common clothes with hood, belt pouch with 15 gp'
        }
    },
    'Folk Hero': {
        description: 'You come from a humble social rank, but you did something extraordinary that made you a local hero. You have a strong connection to the common people and their struggles.',
        bonuses: {
            skills: ['Animal Handling', 'Survival'],
            tools: 'One type of artisan\'s tools, vehicles (land)',
            equipment: 'Artisan\'s tools, shovel, iron pot, common clothes, belt pouch with 10 gp'
        }
    },
    'Noble': {
        description: 'You were born into a wealthy family with significant social standing. You understand the intricacies of high society and have connections among the upper class.',
        bonuses: {
            skills: ['History', 'Persuasion'],
            languages: 1,
            equipment: 'Fine clothes, signet ring, scroll of pedigree, purse with 25 gp'
        }
    },
    'Sage': {
        description: 'You spent years learning the lore of the multiverse, becoming a scholar in your field. You have a vast knowledge of history, magic, and the world\'s mysteries.',
        bonuses: {
            skills: ['Arcana', 'History'],
            languages: 2,
            equipment: 'Bottle of black ink, quill, small knife, letter from a dead colleague, common clothes, belt pouch with 10 gp'
        }
    },
    'Soldier': {
        description: 'You trained as a warrior, serving in an army or militia. You understand military life, tactics, and the importance of discipline and teamwork.',
        bonuses: {
            skills: ['Athletics', 'Intimidation'],
            tools: 'One type of gaming set, vehicles (land)',
            equipment: 'Insignia of rank, trophy from a fallen enemy, set of bone dice, common clothes, belt pouch with 10 gp'
        }
    },
    'Urchin': {
        description: 'You grew up on the streets alone, orphaned, and poor. You had no one to watch over you or to provide for you, so you learned to provide for yourself.',
        bonuses: {
            skills: ['Sleight of Hand', 'Stealth'],
            tools: 'Disguise kit, thieves\' tools',
            equipment: 'Small knife, map of your hometown, pet mouse, token from your parents, common clothes, belt pouch with 10 gp'
        }
    },
    'Guild Artisan': {
        description: 'You are a member of an artisan\'s guild, skilled in a particular field and closely associated with other artisans. You understand the value of quality work and have connections in the business world.',
        bonuses: {
            skills: ['Insight', 'Persuasion'],
            tools: 'One type of artisan\'s tools',
            languages: 1,
            equipment: 'Artisan\'s tools, letter of introduction from your guild, traveler\'s clothes, belt pouch with 15 gp'
        }
    }
};

const personalityTraits = [
    'Brave and courageous in the face of danger, always willing to stand up for what is right. They have a strong moral compass and inspire others with their unwavering determination.',
    'Quiet and reserved, preferring to observe rather than speak. They are thoughtful and analytical, often noticing details that others miss.',
    'Outgoing and friendly, always ready to make new friends and share stories. They have a natural charm that makes others feel comfortable and welcome.',
    'Suspicious of strangers and slow to trust, having learned the hard way that not everyone has good intentions. They are cautious but loyal to those who earn their trust.',
    'Curious and eager to learn about the world, constantly seeking new knowledge and experiences. They have a childlike wonder that makes them excellent problem-solvers.',
    'Practical and down-to-earth, focused on survival and common sense solutions. They value efficiency and reliability above all else.',
    'Charismatic and persuasive, able to talk their way out of trouble and into opportunities. They have a silver tongue and know how to read people.',
    'Mysterious and enigmatic, keeping their true nature hidden behind a carefully crafted facade. They enjoy the intrigue and power that comes with being unknowable.',
    'Optimistic and cheerful, always seeing the bright side of any situation. Their positive attitude is infectious and helps lift the spirits of those around them.',
    'Pragmatic and calculating, always thinking several steps ahead. They prefer to plan carefully rather than act impulsively.',
    'Honorable and just, with a strong sense of duty and responsibility. They believe in doing what is right, even when it is difficult.',
    'Mischievous and playful, always looking for fun and excitement. They have a quick wit and love to play pranks on their friends.',
    'Serious and focused, dedicated to their goals and responsibilities. They have little patience for frivolity or wasted time.',
    'Empathetic and caring, always putting others\' needs before their own. They have a natural ability to understand and help people.',
    'Ambitious and driven, constantly striving to improve and achieve more. They set high standards for themselves and others.',
    'Humble and modest, never seeking recognition for their deeds. They believe that good actions should speak for themselves.',
    'Witty and sarcastic, using humor to cope with difficult situations. They have a sharp tongue but a kind heart.',
    'Disciplined and organized, maintaining strict routines and high standards. They believe that success comes from careful planning and hard work.',
    'Free-spirited and spontaneous, living in the moment and following their heart. They value personal freedom above all else.',
    'Protective and nurturing, always looking out for the well-being of others. They have a strong maternal/paternal instinct.',
    'Analytical and logical, approaching problems with careful consideration. They prefer facts and evidence over emotions and intuition.',
    'Artistic and creative, seeing beauty and potential in everything. They express themselves through various forms of art.',
    'Competitive and driven, always striving to be the best. They take great pride in their achievements and abilities.',
    'Diplomatic and tactful, skilled at navigating social situations. They know how to maintain peace and harmony in groups.'
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

// Add Dragonborn colors
const dragonbornColors = [
    'Red', 'Blue', 'Green', 'Black', 'White',  // Chromatic
    'Gold', 'Silver', 'Bronze', 'Copper', 'Brass'  // Metallic
];

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

// Function to get a random dragonborn color
function getRandomDragonbornColor() {
    return getRandomElement(dragonbornColors);
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

// Function to get random number in range
function getRandomInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Function to generate specific height based on range
function generateSpecificHeight(heightRange, isFemale) {
    // Extract numbers from height range string (e.g., "5'0\" to 7'0\"" -> [5, 0, 7, 0])
    const numbers = heightRange.match(/\d+/g).map(Number);
    let minFeet = numbers[0];
    let minInches = numbers[1];
    let maxFeet = numbers[2];
    let maxInches = numbers[3];
    
    // Convert to total inches for easier calculation
    const minTotalInches = (minFeet * 12) + minInches;
    const maxTotalInches = (maxFeet * 12) + maxInches;
    
    // Generate random height in inches
    const totalInches = getRandomInRange(minTotalInches, maxTotalInches);
    
    // Convert back to feet and inches
    const feet = Math.floor(totalInches / 12);
    const inches = totalInches % 12;
    
    return `${feet}'${inches}"`;
}

// Function to generate specific weight based on range
function generateSpecificWeight(weightRange, isFemale) {
    // Extract numbers from weight range string (e.g., "120-200 lbs" -> [120, 200])
    const numbers = weightRange.match(/\d+/g).map(Number);
    const minWeight = numbers[0];
    const maxWeight = numbers[1];
    
    // Generate random weight
    const weight = getRandomInRange(minWeight, maxWeight);
    
    return `${weight} lbs`;
}

// Function to get race-specific physical description with specific measurements
function getRacePhysicalDescription(race, isFemale) {
    const descriptions = racePhysicalDescriptions[race] || physicalDescriptions;
    const baseDescription = getRandomElement(descriptions);
    
    // Extract height and weight ranges
    const heightMatch = baseDescription.match(/\d+'[0-9]+\" to \d+'[0-9]+\"/);
    const weightMatch = baseDescription.match(/\d+-\d+ lbs/);
    
    if (heightMatch && weightMatch) {
        const heightRange = heightMatch[0];
        const weightRange = weightMatch[0];
        
        // Generate specific measurements
        const specificHeight = generateSpecificHeight(heightRange, isFemale);
        const specificWeight = generateSpecificWeight(weightRange, isFemale);
        
        // Replace ranges with specific measurements
        return baseDescription
            .replace(heightRange, specificHeight)
            .replace(weightRange, specificWeight);
    }
    
    return baseDescription;
}

// Function to populate dropdowns
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
    const genders = ['Male', 'Female'];
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

    generateBtn.disabled = !(raceSelect.value && genderSelect.value && classSelect.value);
}

// Function to generate a random NPC
function generateRandomNPC() {
    const race = getRandomElement(races);
    const gender = getRandomElement(['Male', 'Female']);
    const characterClass = getRandomElement(classes);
    const background = getRandomElement(backgrounds);
    const personality = getRandomElement(personalityTraits);
    const isFemale = gender === 'Female';
    const physicalDescription = getRacePhysicalDescription(race, isFemale);
    const name = generateName(race, gender);
    const abilities = generateAbilityScoresForClass(characterClass);
    const subraceObj = getRandomSubrace(race);
    const finalAbilities = applyRacialBonuses(abilities, race, subraceObj);
    const dragonColor = race === 'Dragonborn' ? getRandomDragonbornColor() : null;

    return {
        name,
        race,
        gender,
        class: characterClass,
        background,
        personality,
        physicalDescription,
        abilities: finalAbilities,
        dragonColor
    };
}

// Function to generate an NPC based on selections
function generateSelectedNPC() {
    const race = document.getElementById('raceSelect').value;
    const gender = document.getElementById('genderSelect').value;
    const characterClass = document.getElementById('classSelect').value;
    const background = getRandomElement(backgrounds);
    const personality = getRandomElement(personalityTraits);
    const isFemale = gender === 'Female';
    const physicalDescription = getRacePhysicalDescription(race, isFemale);
    const name = generateName(race, gender);
    const abilities = generateAbilityScoresForClass(characterClass);
    const subraceObj = getRandomSubrace(race);
    const finalAbilities = applyRacialBonuses(abilities, race, subraceObj);
    const dragonColor = race === 'Dragonborn' ? getRandomDragonbornColor() : null;

    return {
        name,
        race,
        gender,
        class: characterClass,
        background,
        personality,
        physicalDescription,
        abilities: finalAbilities,
        dragonColor
    };
}

// Function to update the UI with NPC data
function updateNPCDisplay(npc) {
    document.getElementById('npcName').textContent = npc.name;
    
    // Update race display to include subrace or dragonborn color
    let raceText = npc.race;
    if (npc.race === 'Dragonborn') {
        raceText = `${npc.race} (${npc.dragonColor})`;
    } else {
        const subraceObj = getRandomSubrace(npc.race);
        if (subraceObj) {
            raceText = `${npc.race} (${subraceObj.name})`;
        }
    }
    document.getElementById('npcRace').textContent = `${raceText} • ${npc.class}`;
    
    // Update physical description
    document.getElementById('npcDescription').textContent = npc.physicalDescription;
    
    // Update personality details
    const personalityTraitsList = document.getElementById('personalityTraitsList');
    personalityTraitsList.innerHTML = '';
    
    // Split the personality description into sentences and create list items
    const sentences = npc.personality.split('. ').filter(s => s.trim().length > 0);
    sentences.forEach(sentence => {
        const traitItem = document.createElement('li');
        traitItem.textContent = sentence.trim();
        personalityTraitsList.appendChild(traitItem);
    });

    document.getElementById('npcBackground').textContent = npc.background;

    // Update background details
    const backgroundDef = backgroundDefinitions[npc.background];
    if (backgroundDef) {
        document.getElementById('backgroundDescription').textContent = backgroundDef.description;
        
        const bonusesList = document.getElementById('backgroundBonusesList');
        bonusesList.innerHTML = '';
        
        // Add skills
        if (backgroundDef.bonuses.skills) {
            const skillsItem = document.createElement('li');
            skillsItem.textContent = `Skills: ${backgroundDef.bonuses.skills.join(', ')}`;
            bonusesList.appendChild(skillsItem);
        }
        
        // Add languages
        if (backgroundDef.bonuses.languages) {
            const languagesItem = document.createElement('li');
            languagesItem.textContent = `Additional Languages: ${backgroundDef.bonuses.languages}`;
            bonusesList.appendChild(languagesItem);
        }
        
        // Add tools
        if (backgroundDef.bonuses.tools) {
            const toolsItem = document.createElement('li');
            toolsItem.textContent = `Tools: ${backgroundDef.bonuses.tools}`;
            bonusesList.appendChild(toolsItem);
        }
        
        // Add equipment
        if (backgroundDef.bonuses.equipment) {
            const equipmentItem = document.createElement('li');
            equipmentItem.textContent = `Equipment: ${backgroundDef.bonuses.equipment}`;
            bonusesList.appendChild(equipmentItem);
        }
    }

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