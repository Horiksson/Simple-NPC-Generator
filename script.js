// Import the config
import config from './config.js';

// Data for NPC generation
const races = [
    'Human', 'Elf', 'Dwarf', 'Halfling', 'Gnome', 'Half-Orc', 'Tiefling', 'Dragonborn'
];

const classes = [
    'Fighter', 'Wizard', 'Cleric', 'Rogue', 'Ranger', 'Paladin', 'Bard', 'Druid', 'Monk', 'Barbarian'
];

const backgrounds = [
    'Acolyte', 'Criminal', 'Folk Hero', 'Noble', 'Sage', 'Soldier', 'Urchin', 'Guild Artisan',
    'Charlatan', 'Entertainer', 'Hermit', 'Outlander', 'Haunted One', 'City Watch', 'Clan Crafter', 'Courtier'
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
    },
    'Charlatan': {
        description: 'You have always had a way with people. You know what makes them tick, you can tease out their secrets, and you can manipulate them into doing what you want. You\'re skilled at deception and have a talent for creating false identities.',
        bonuses: {
            skills: ['Deception', 'Sleight of Hand'],
            tools: 'Disguise kit, forgery kit',
            equipment: 'Fine clothes, disguise kit, tools of the con of your choice, belt pouch with 15 gp'
        }
    },
    'Entertainer': {
        description: 'You live to sway and subvert the emotions of your audience by music, oratory, or drama. You know how to entrance them, entertain them, and even inspire them. Your performances can stir the hearts of those who hear you.',
        bonuses: {
            skills: ['Acrobatics', 'Performance'],
            tools: 'Disguise kit, one type of musical instrument',
            equipment: 'Musical instrument, costume, belt pouch with 15 gp'
        }
    },
    'Hermit': {
        description: 'You lived in seclusion—either in a sheltered community such as a monastery, or entirely alone—for a formative part of your life. In your time apart from the clamor of society, you found quiet, solitude, and perhaps some of the answers you were looking for.',
        bonuses: {
            skills: ['Medicine', 'Religion'],
            languages: 1,
            equipment: 'Scroll case stuffed with notes, winter blanket, common clothes, herbalism kit, 5 gp'
        }
    },
    'Outlander': {
        description: 'You grew up in the wilds, far from civilization and the comforts of town and technology. You\'ve witnessed the migration of herds larger than forests, survived weather more extreme than any city-dweller could comprehend, and enjoyed the solitude of being the only thinking creature for miles in any direction.',
        bonuses: {
            skills: ['Athletics', 'Survival'],
            languages: 1,
            equipment: 'Staff, hunting trap, trophy from an animal you killed, traveler\'s clothes, belt pouch with 10 gp'
        }
    },
    'Haunted One': {
        description: 'You are haunted by something so terrible that you dare not speak of it. You\'ve tried to bury it and run away from it, to no avail. Whatever this thing is that haunts you can\'t be slain with a sword or banished with a spell. It might come to you as a shadow on the wall, a bloodcurdling nightmare, a memory that refuses to die, or a demonic whisper in the dark.',
        bonuses: {
            skills: ['Intimidation', 'Survival'],
            languages: 1,
            equipment: 'Monster hunter\'s pack, gothic trinket, common clothes, belt pouch with 10 gp'
        }
    },
    'City Watch': {
        description: 'You served in a city watch or guard force, helping to maintain the peace in your home city. You might have been a patrol officer, a detective, or even a specialized guard such as a member of a magical task force.',
        bonuses: {
            skills: ['Athletics', 'Insight'],
            languages: 2,
            equipment: 'Uniform, horn with which to summon help, manacles, traveler\'s clothes, belt pouch with 10 gp'
        }
    },
    'Clan Crafter': {
        description: 'You are a member of a clan of skilled artisans, crafters, and smiths. Your clan is known for its expertise in a particular craft, and you learned the basics of that craft from your clan members.',
        bonuses: {
            skills: ['History', 'Insight'],
            tools: 'One type of artisan\'s tools',
            languages: 1,
            equipment: 'Artisan\'s tools, maker\'s mark chisel, traveler\'s clothes, belt pouch with 5 gp'
        }
    },
    'Courtier': {
        description: 'You served as an advisor to a monarch or other noble, helping to guide their decisions and maintain their power. You might have been a diplomat, a spymaster, or even a royal advisor.',
        bonuses: {
            skills: ['Insight', 'Persuasion'],
            languages: 2,
            equipment: 'Fine clothes, signet ring, scroll of pedigree, purse with 20 gp'
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
    console.log('Populating dropdowns...'); // Debug log
    
    const raceSelect = document.getElementById('raceSelect');
    const genderSelect = document.getElementById('genderSelect');
    const classSelect = document.getElementById('classSelect');

    if (!raceSelect || !genderSelect || !classSelect) {
        console.error('Could not find one or more select elements');
        return;
    }

    // Clear existing options except the first one
    raceSelect.innerHTML = '<option value="">Select Race</option>';
    genderSelect.innerHTML = '<option value="">Select Gender</option>';
    classSelect.innerHTML = '<option value="">Select Class</option>';

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

    console.log('Dropdowns populated successfully'); // Debug log
}

// Function to check if all selections are made
function checkSelections() {
    const raceSelect = document.getElementById('raceSelect');
    const genderSelect = document.getElementById('genderSelect');
    const classSelect = document.getElementById('classSelect');
    const generateBtn = document.getElementById('generateBtn');

        generateBtn.disabled = !(raceSelect.value && genderSelect.value && classSelect.value);
    }

// Function to generate a backstory based on background
function generateBackstory(background, name, race, gender) {
    const backstoryTemplates = {
        'Acolyte': [
            `Growing up in the temple, ${name} showed an early affinity for the divine. Their dedication to religious studies and spiritual practices earned them the respect of the temple elders. A pivotal moment came when they successfully mediated a conflict between two warring factions, proving their worth as a spiritual leader.`,
            `From a young age, ${name} was drawn to the mysteries of the divine. Their time in the temple shaped their worldview, teaching them the importance of faith and community. A life-changing pilgrimage to a sacred site revealed their true calling to serve the gods.`,
            `The temple became ${name}'s home after being orphaned at a young age. Their natural wisdom and compassion made them a beloved figure among the temple's followers. A miraculous healing they performed during a plague cemented their reputation as a chosen servant of the divine.`,
            `As a young acolyte, ${name} discovered an ancient religious text that had been lost for centuries. Their translation and interpretation of the text led to a revival of forgotten religious practices. The discovery earned them recognition from religious scholars across the land.`,
            `During a time of great religious conflict, ${name} risked their life to protect sacred artifacts from desecration. Their bravery and devotion inspired others to stand up for their faith. The experience taught them that true faith requires both courage and compassion.`
        ],
        'Criminal': [
            `Life on the streets taught ${name} to be resourceful and cunning. Their natural talent for deception and stealth made them a valuable asset to the local thieves' guild. A botched heist that went wrong forced them to reconsider their life choices and seek redemption.`,
            `Growing up in the criminal underworld, ${name} learned to navigate the dangerous streets with ease. Their quick thinking and street smarts helped them survive numerous close calls. A chance encounter with a former victim made them question their life of crime.`,
            `From pickpocket to master thief, ${name}'s rise in the criminal world was swift. Their reputation for successful heists and clean getaways made them a legend in the underworld. A betrayal by their closest ally taught them the true cost of trust in their line of work.`,
            `As a master forger, ${name} created documents so perfect they fooled even the most careful inspectors. Their skills made them both feared and respected in criminal circles. A chance encounter with a noble who recognized their talent led to an unexpected opportunity for redemption.`,
            `During a major heist, ${name} discovered evidence of a conspiracy that threatened the entire city. Their decision to expose the plot, despite the risk to their own life, showed a glimmer of honor beneath their criminal exterior. The experience changed their perspective on right and wrong forever.`
        ],
        'Folk Hero': [
            `Born to humble beginnings, ${name} never expected to become a local legend. Their heroic act of saving a village from bandits earned them the respect of the common folk. The experience taught them the true meaning of courage and sacrifice.`,
            `Growing up in a small village, ${name} was known for their kind heart and strong sense of justice. Their daring rescue of children from a burning building made them a local hero. The incident inspired them to continue protecting their community.`,
            `A simple farmer by trade, ${name}'s life changed when they stood up to corrupt local officials. Their bravery in the face of danger inspired others to fight for their rights. The experience showed them the power of one person to make a difference.`,
            `When a terrible storm threatened to destroy their village, ${name} led the effort to reinforce the dam and save the community. Their quick thinking and leadership during the crisis earned them the title of village protector. The experience taught them that true heroism comes from helping others.`,
            `After discovering a plot to poison the village's water supply, ${name} risked their life to warn the community. Their actions saved countless lives and earned them the gratitude of the entire region. The experience showed them that heroes can come from the most unexpected places.`
        ],
        'Noble': [
            `Born into privilege, ${name} was raised with the finest education and training. Their natural charisma and diplomatic skills made them a favorite among the noble courts. A political scandal in their family taught them the importance of honor and integrity.`,
            `Growing up in a noble house, ${name} learned the intricate dance of court politics from an early age. Their strategic mind and social grace made them a formidable player in noble circles. A failed arranged marriage led them to question the traditions of their class.`,
            `As a member of the nobility, ${name} was expected to follow a predetermined path. Their rebellious spirit and desire for adventure often clashed with their family's expectations. A chance encounter with commoners showed them a different way of life.`,
            `When their family's estate was threatened by a rival house, ${name} used their political acumen to broker a peace that saved both families from ruin. Their diplomatic success earned them respect among the nobility. The experience taught them that true power comes from wisdom, not wealth.`,
            `After discovering corruption within their own family's business dealings, ${name} made the difficult decision to expose the truth. Their commitment to justice, even at the cost of their family's reputation, showed their true character. The experience taught them that nobility is earned through actions, not birthright.`
        ],
        'Sage': [
            `From childhood, ${name} displayed an insatiable curiosity about the world. Their years of study and research made them a respected scholar in their field. A groundbreaking discovery in ancient texts changed their understanding of magic forever.`,
            `Growing up in a family of scholars, ${name} was surrounded by knowledge from an early age. Their photographic memory and analytical mind made them a prodigy in their studies. A chance encounter with a mysterious artifact led them down an unexpected path.`,
            `As a lifelong student of the arcane, ${name} dedicated themselves to unraveling the mysteries of the universe. Their extensive research and experiments earned them recognition among their peers. A failed magical experiment taught them the importance of caution and preparation.`,
            `During their research into ancient civilizations, ${name} discovered a lost library containing knowledge thought to be destroyed. Their work to preserve and translate these texts earned them recognition from scholars worldwide. The discovery changed their understanding of history forever.`,
            `When a magical anomaly threatened their city, ${name} used their knowledge to develop a solution that saved countless lives. Their quick thinking and expertise earned them the respect of both scholars and commoners. The experience showed them that knowledge is most valuable when used to help others.`
        ],
        'Soldier': [
            `Trained from youth in the art of war, ${name} became a skilled warrior through discipline and dedication. Their tactical mind and leadership abilities earned them the respect of their fellow soldiers. A devastating battle changed their perspective on war forever.`,
            `Growing up in a military family, ${name} learned the importance of duty and honor. Their natural combat skills and strategic thinking made them a valuable asset to their unit. A mission gone wrong taught them the true cost of war.`,
            `As a career soldier, ${name} has seen their share of battles and conflicts. Their experience and wisdom made them a mentor to younger soldiers. A chance encounter with enemy civilians showed them the human cost of war.`,
            `During a crucial battle, ${name} led their unit to victory against overwhelming odds. Their tactical brilliance and courage under fire earned them recognition from their superiors. The experience taught them that true leadership means putting your soldiers' lives before your own glory.`,
            `After being captured and held prisoner of war, ${name} used their knowledge of enemy tactics to escape and save their fellow prisoners. Their resourcefulness and determination earned them the respect of both allies and former enemies. The experience showed them that honor can be found even in the darkest of circumstances.`
        ],
        'Urchin': [
            `Orphaned at a young age, ${name} learned to survive on the streets through wit and determination. Their natural agility and street smarts helped them navigate the dangerous city. A chance encounter with a kind stranger gave them hope for a better life.`,
            `Growing up alone in the city, ${name} had to learn everything the hard way. Their quick fingers and faster mind made them a skilled pickpocket and street performer. A near-death experience made them reconsider their life choices.`,
            `As a street urchin, ${name} learned to trust no one and rely only on themselves. Their natural charm and resourcefulness helped them survive in the harsh city streets. A chance discovery of their family's history changed their life forever.`,
            `When a gang of thieves tried to force ${name} to join their ranks, they used their street smarts to outmaneuver them and protect other vulnerable children. Their courage and quick thinking earned them the respect of the local community. The experience taught them that strength comes from protecting others.`,
            `After discovering a plot to kidnap children from the streets, ${name} risked their life to warn the city guard. Their bravery and knowledge of the city's hidden paths helped save many lives. The experience showed them that even the smallest person can make a big difference.`
        ],
        'Guild Artisan': [
            `Trained from childhood in their craft, ${name} became a master artisan through dedication and passion. Their innovative techniques and attention to detail earned them recognition in their guild. A chance commission from a noble changed their career forever.`,
            `Growing up in a family of artisans, ${name} learned the value of quality work and craftsmanship. Their natural talent and creative vision made them stand out among their peers. A failed business venture taught them valuable lessons about trade and commerce.`,
            `As a guild member, ${name} has dedicated their life to perfecting their craft. Their reputation for excellence and fair dealing made them a respected figure in the business community. A chance encounter with a mysterious client led them on an unexpected adventure.`,
            `When their guild faced a crisis due to a shortage of materials, ${name} developed an innovative solution that saved the guild from financial ruin. Their creativity and business acumen earned them a position of leadership. The experience taught them that true mastery involves both skill and innovation.`,
            `After discovering that their guild was being cheated by a corrupt merchant, ${name} gathered evidence and exposed the scheme. Their integrity and courage earned them the respect of their fellow artisans. The experience showed them that honor in business is as important as skill in craft.`
        ],
        'Charlatan': [
            `From an early age, ${name} discovered their natural talent for deception and manipulation. Their silver tongue and quick wit made them a master of various cons and schemes. A particularly elaborate con that went wrong taught them the importance of having a backup plan.`,
            `Growing up on the streets, ${name} learned that sometimes the best way to survive was to be someone else. Their talent for creating false identities and weaving convincing stories made them a legend in the underworld. A chance encounter with one of their victims led to an unexpected friendship.`,
            `As a professional con artist, ${name} has perfected the art of deception. Their elaborate schemes and convincing performances earned them both fame and infamy. A failed con that resulted in helping someone in need made them question their life choices.`,
            `When a con went too far and threatened to harm innocent people, ${name} risked their own safety to prevent the disaster. Their unexpected act of heroism earned them the respect of those they had previously deceived. The experience taught them that even a charlatan can find redemption.`,
            `After years of successful cons, ${name} developed a reputation for never targeting those who couldn't afford to lose. Their strange code of honor earned them respect among both criminals and law enforcement. The experience showed them that even in deception, there can be honor.`
        ],
        'Entertainer': [
            `Born with a natural talent for performance, ${name} quickly rose to fame in the entertainment world. Their captivating shows and magnetic personality made them a beloved figure among audiences. A chance encounter with a mysterious patron led them on an unexpected adventure.`,
            `Growing up in a family of performers, ${name} learned the art of entertainment from an early age. Their unique style and innovative performances set them apart from other entertainers. A failed performance that turned into a triumph taught them the value of perseverance.`,
            `As a traveling entertainer, ${name} has seen the world and performed for audiences of all kinds. Their ability to connect with people through their art made them a favorite among nobles and commoners alike. A chance discovery of a hidden talent changed their career forever.`,
            `When their performance helped expose a corrupt official's crimes, ${name} became an unwitting hero to the common people. Their art became a tool for social change, earning them both fame and danger. The experience taught them that entertainment can be a powerful force for good.`,
            `After years of performing for royalty, ${name} chose to return to their roots and perform for the common folk. Their decision to use their fame to help others earned them the respect of both high and low society. The experience showed them that true success comes from touching people's hearts.`
        ],
        'Hermit': [
            `Seeking answers to life's great questions, ${name} retreated from society to live in solitude. Their years of meditation and study led to profound insights about the nature of existence. A chance encounter with a lost traveler revealed a truth they had been seeking.`,
            `After a traumatic event, ${name} chose to live in isolation, finding peace in the quiet of nature. Their time alone taught them valuable lessons about self-reliance and inner strength. A mysterious discovery in their hermitage changed their understanding of the world.`,
            `As a hermit, ${name} dedicated their life to spiritual growth and self-discovery. Their reputation as a wise recluse drew seekers of knowledge to their door. A chance encounter with a powerful entity revealed their true purpose in life.`,
            `When a natural disaster threatened nearby villages, ${name} emerged from seclusion to share their knowledge of the land and help save lives. Their unexpected return to society earned them the respect of those they helped. The experience taught them that wisdom is meant to be shared.`,
            `After years of isolation, ${name} discovered an ancient prophecy that could only be fulfilled by returning to the world. Their decision to leave their peaceful life behind showed their commitment to a greater purpose. The experience taught them that sometimes the greatest wisdom comes from engaging with the world.`
        ],
        'Outlander': [
            `Growing up in the wilderness, ${name} learned to survive in the harshest conditions. Their intimate knowledge of nature and survival skills made them a legend among travelers. A chance encounter with a lost civilization changed their understanding of the world.`,
            `As a nomadic hunter, ${name} traveled far and wide, following the great herds. Their tracking skills and knowledge of the land made them an invaluable guide. A dangerous encounter with a mythical beast proved their worth as a wilderness expert.`,
            `Born to a tribe of wilderness dwellers, ${name} learned the ancient ways of their people. Their connection to nature and survival instincts made them a respected member of their community. A chance discovery of a sacred site revealed their true calling.`,
            `When a group of city-dwellers became lost in the wilderness, ${name} risked their life to guide them to safety. Their knowledge of the land and survival skills saved the group from certain death. The experience taught them that their skills could be used to help others.`,
            `After years of living in harmony with nature, ${name} discovered evidence of a threat to the natural world. Their decision to leave their peaceful life to warn civilization showed their commitment to protecting the wilderness. The experience taught them that sometimes one must leave their comfort zone to make a difference.`
        ],
        'Haunted One': [
            `A terrible event in ${name}'s past left them forever changed. Their encounters with the supernatural have given them unique insights into the nature of fear and darkness. A chance discovery of others with similar experiences led them to seek answers.`,
            `Growing up with a dark presence always watching, ${name} learned to live with constant fear. Their experiences with the supernatural have made them both cautious and curious. A chance encounter with a powerful entity revealed the truth about their haunting.`,
            `As someone marked by darkness, ${name} has seen things that would drive others mad. Their ability to face their fears has made them stronger than most. A chance discovery of an ancient text revealed the nature of their curse.`,
            `When their haunting began to affect others, ${name} dedicated themselves to understanding and controlling their curse. Their research and experiments led to discoveries that helped others with similar afflictions. The experience taught them that their curse could be a gift in disguise.`,
            `After years of running from their haunting, ${name} finally faced their fear and discovered that the entity was trying to warn them about a greater danger. Their courage in facing the unknown earned them the respect of those who understood their struggle. The experience showed them that sometimes the greatest threats come with the greatest rewards.`
        ],
        'City Watch': [
            `Joining the city watch at a young age, ${name} quickly rose through the ranks. Their dedication to justice and sharp investigative skills made them a respected officer. A particularly challenging case changed their perspective on law enforcement forever.`,
            `Growing up in a family of watchmen, ${name} learned the importance of maintaining order. Their natural leadership abilities and tactical mind made them an effective commander. A dangerous encounter with a criminal mastermind tested their resolve.`,
            `As a veteran of the city watch, ${name} has seen the best and worst of urban life. Their experience and wisdom made them a mentor to younger officers. A chance discovery of corruption within the watch led them on a personal mission.`,
            `When a series of mysterious disappearances plagued the city, ${name} worked tirelessly to solve the case. Their dedication and innovative investigative techniques led to the discovery of a secret criminal organization. The experience taught them that justice sometimes requires thinking outside the law.`,
            `After years of enforcing the law, ${name} discovered that some laws were being used to oppress the innocent. Their decision to fight for justice, even when it meant challenging the system, earned them the respect of both citizens and criminals. The experience showed them that true justice requires both strength and compassion.`
        ],
        'Clan Crafter': [
            `Born into a family of master craftsmen, ${name} learned the secrets of their trade from an early age. Their innovative techniques and attention to detail earned them recognition among their clan. A chance commission from a powerful figure changed their life forever.`,
            `Growing up in a clan of artisans, ${name} developed a deep appreciation for quality craftsmanship. Their natural talent and creative vision made them stand out among their peers. A failed project that led to a breakthrough taught them valuable lessons.`,
            `As a master craftsman, ${name} has dedicated their life to perfecting their art. Their reputation for excellence and fair dealing made them a respected figure in their community. A chance discovery of an ancient crafting technique revealed new possibilities.`,
            `When their clan faced a crisis due to a shortage of materials, ${name} developed an innovative solution that saved their traditional craft from extinction. Their creativity and dedication earned them the respect of the entire clan. The experience taught them that tradition and innovation can work together.`,
            `After years of perfecting their craft, ${name} discovered that their work was being used for nefarious purposes. Their decision to use their skills to create tools for justice rather than weapons of war earned them the respect of both craftsmen and warriors. The experience showed them that true mastery involves responsibility.`
        ],
        'Courtier': [
            `Raised in the intricate world of court politics, ${name} learned to navigate the complex social hierarchy. Their diplomatic skills and political acumen made them a valuable advisor. A dangerous political intrigue tested their loyalty and wisdom.`,
            `Growing up in a noble court, ${name} mastered the art of diplomacy and intrigue. Their ability to read people and situations made them an effective mediator. A chance encounter with a foreign diplomat led to an unexpected alliance.`,
            `As a seasoned courtier, ${name} has seen the rise and fall of many noble houses. Their experience and connections made them a power broker in court politics. A chance discovery of a conspiracy threatened to upset the delicate balance of power.`,
            `When a diplomatic crisis threatened to lead to war, ${name} used their knowledge of court politics to broker a peace that satisfied all parties. Their diplomatic success earned them recognition from multiple kingdoms. The experience taught them that true power comes from preventing conflict.`,
            `After years of navigating court politics, ${name} discovered that their position could be used to help the common people. Their decision to use their influence for the greater good earned them the respect of both nobles and commoners. The experience showed them that true leadership means serving others.`
        ]
    };

    const templates = backstoryTemplates[background] || backstoryTemplates['Folk Hero'];
    return getRandomElement(templates);
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
    const backstory = generateBackstory(background, name, race, gender);

    return {
        name,
        race,
        gender,
        class: characterClass,
        background,
        personality,
        physicalDescription,
        abilities: finalAbilities,
        dragonColor,
        backstory
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
    const backstory = generateBackstory(background, name, race, gender);

    return {
        name,
        race,
        gender,
        class: characterClass,
        background,
        personality,
        physicalDescription,
        abilities: finalAbilities,
        dragonColor,
        backstory
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

    // Remove any existing backstory sections
    const allDetailSections = document.querySelectorAll('.detail-section');
    allDetailSections.forEach(section => {
        const heading = section.querySelector('h3');
        if (heading && heading.textContent === 'Backstory') {
            section.remove();
        }
    });

    // Add backstory section
    const backstorySection = document.createElement('div');
    backstorySection.className = 'detail-section';
    backstorySection.innerHTML = `
        <h3>Backstory</h3>
        <p>${npc.backstory}</p>
    `;
    
    // Insert backstory section after background section
    const backgroundSection = document.querySelector('.detail-section:has(#npcBackground)');
    if (backgroundSection) {
        backgroundSection.parentNode.insertBefore(backstorySection, backgroundSection.nextSibling);
    } else {
        // Fallback: append to the end of the details section
        const detailsSection = document.querySelector('.npc-details');
        if (detailsSection) {
            detailsSection.appendChild(backstorySection);
        }
    }

    // Update ability scores
    document.getElementById('strScore').textContent = npc.abilities.str;
    document.getElementById('dexScore').textContent = npc.abilities.dex;
    document.getElementById('conScore').textContent = npc.abilities.con;
    document.getElementById('intScore').textContent = npc.abilities.int;
    document.getElementById('wisScore').textContent = npc.abilities.wis;
    document.getElementById('chaScore').textContent = npc.abilities.cha;

    // Generate the NPC image
    generateNPCImage(npc);
}

// Add this function to generate the image prompt
function generateImagePrompt(npc) {
    const race = npc.race.toLowerCase();
    const gender = npc.gender.toLowerCase();
    const characterClass = npc.class.toLowerCase();
    const physicalDesc = npc.physicalDescription.toLowerCase();
    
    return `A detailed portrait of a ${gender} ${race} ${characterClass} in D&D style. ${physicalDesc}. 
    The character has a ${npc.personality.split('.')[0].toLowerCase()}. 
    The image should be in a fantasy art style, suitable for a D&D character portrait. 
    The background should be subtle and not distracting.`;
}

// Add this function to generate the image
async function generateNPCImage(npc) {
    const imageContainer = document.getElementById('npcImage');
    const loadingSpinner = document.getElementById('imageLoading');
    
    // Show loading spinner
    imageContainer.style.display = 'none';
    loadingSpinner.style.display = 'flex';
    
    try {
        const prompt = generateImagePrompt(npc);
        
        const response = await fetch('https://api.stability.ai/v1/generation/stable-diffusion-xl-1024-v1-0/text-to-image', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${config.STABLE_DIFFUSION_API_KEY}`,
            },
            body: JSON.stringify({
                text_prompts: [
                    {
                        text: prompt,
                        weight: 1
                    }
                ],
                cfg_scale: 7,
                height: 1024,
                width: 1024,
                samples: 1,
                steps: 30,
            }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        
        // Convert the base64 image to a URL
        const imageUrl = `data:image/png;base64,${result.artifacts[0].base64}`;
        
        // Update the image
        imageContainer.src = imageUrl;
        imageContainer.style.display = 'block';
    } catch (error) {
        console.error('Error generating image:', error);
        // You might want to show an error message to the user here
    } finally {
        loadingSpinner.style.display = 'none';
    }
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM Content Loaded'); // Debug log
    
    // Populate dropdowns
    populateDropdowns();
    
    // Set up event listeners for dropdowns
    const raceSelect = document.getElementById('raceSelect');
    const genderSelect = document.getElementById('genderSelect');
    const classSelect = document.getElementById('classSelect');
    const generateBtn = document.getElementById('generateBtn');
    const randomBtn = document.getElementById('randomBtn');

    console.log('Elements found:', { raceSelect, genderSelect, classSelect, generateBtn, randomBtn }); // Debug log

    if (raceSelect) raceSelect.addEventListener('change', checkSelections);
    if (genderSelect) genderSelect.addEventListener('change', checkSelections);
    if (classSelect) classSelect.addEventListener('change', checkSelections);

    // Set up event listener for generate button
    if (generateBtn) {
        generateBtn.addEventListener('click', () => {
            console.log('Generate button clicked'); // Debug log
            const npc = generateSelectedNPC();
            updateNPCDisplay(npc);
        });
    }

    // Set up event listener for random button
    if (randomBtn) {
        randomBtn.addEventListener('click', () => {
            console.log('Random button clicked'); // Debug log
            const npc = generateRandomNPC();
            updateNPCDisplay(npc);
        });
    }

    // Initial check of selections
    checkSelections();
}); 