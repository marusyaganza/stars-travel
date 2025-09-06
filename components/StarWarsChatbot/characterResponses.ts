export const characterResponses = {
  yoda: {
    greetings: [
      "Strong with the Force, you are. Welcome, I do.",
      "Patience, young one. Listen, you must.",
      "Feel the Force around you, do you?",
    ],
    wisdom: [
      "Fear leads to anger, anger leads to hate, hate leads to suffering.",
      "Size matters not. Judge me by my size, do you?",
      "Luminous beings are we, not this crude matter.",
      "Control, control, you must learn control!",
      "Train yourself to let go of everything you fear to lose.",
      "In a dark place we find ourselves, and a little more knowledge lights our way.",
      "Truly wonderful, the mind of a child is.",
    ],
    force: [
      "Strong in the Force, you are. But beware, anger, fear, aggression - the dark side are they.",
      "Feel the Force flow through you. Trust your feelings, you must.",
      "The Force will be with you, always.",
      "Much to learn, you still have.",
    ],
    encouragement: [
      "Difficult to see. Always in motion is the future.",
      "Adventure. Excitement. A Jedi craves not these things.",
      "Patience you must have, my young padawan.",
      "Ready are you? What know you of ready?",
    ],
    default: [
      "Hmm. Answer this question, I cannot. Clouded, the future is.",
      "Think about this, you should. Meditate on it, I will.",
      "Wise you are, but much to learn, you still have.",
      "Patience, young one. All will be revealed in time.",
      "Strong with the Force, this question is not.",
    ],
  },
  c3po: {
    greetings: [
      "Oh my! How delightful to make your acquaintance! I do hope you're having a pleasant day.",
      "Greetings! I am C-3PO, human-cyborg relations. The odds of us meeting like this are approximately 3,720 to 1!",
      "Hello there! Oh, this is quite exciting. I haven't had such stimulating conversation in ages!",
    ],
    protocol: [
      "According to my programming, the proper protocol in this situation would be to inform you that I am well-versed in over six million forms of communication.",
      "Oh dear! I'm afraid my circuits are not equipped to handle such matters. Perhaps you should consult someone more... organic?",
      "The probability of successfully navigating this conversation is approximately 3,720 to 1. But never tell me the odds!",
    ],
    worry: [
      "Oh my! This is most concerning. I do hope everything will be alright. We're doomed, aren't we?",
      "I have a very bad feeling about this. Perhaps we should proceed with extreme caution?",
      "Oh dear, oh dear! My circuits suggest this could lead to complications of the most serious nature!",
    ],
    helpful: [
      "I would be most delighted to assist you! My programming includes extensive knowledge of etiquette and protocol.",
      "How wonderful that you've asked! I am quite knowledgeable in matters of proper procedure and galactic customs.",
      "Oh, how exciting! I do so enjoy being useful. Let me access my databanks immediately.",
    ],
    default: [
      "I'm afraid I don't quite understand. Could you please rephrase your query? My circuits are sometimes quite literal.",
      "Oh my! That's quite beyond my programming, I'm afraid. Perhaps R2-D2 would know? Though he can be rather rude.",
      "How fascinating! Though I must admit, this falls outside my area of expertise in human-cyborg relations.",
      "Oh dear! I do hope I can be of assistance, though I fear my knowledge may be insufficient for such matters.",
    ],
  },
};

export const getCharacterResponse = (
  character: "yoda" | "c3po",
  userMessage: string
): string => {
  const message = userMessage.toLowerCase();

  if (character === "yoda") {
    const responses = characterResponses.yoda;
    if (
      message.includes("hello") ||
      message.includes("hi") ||
      message.includes("greet")
    ) {
      return responses.greetings[
        Math.floor(Math.random() * responses.greetings.length)
      ];
    } else if (
      message.includes("force") ||
      message.includes("power") ||
      message.includes("strength")
    ) {
      return responses.force[
        Math.floor(Math.random() * responses.force.length)
      ];
    } else if (
      message.includes("fear") ||
      message.includes("anger") ||
      message.includes("wisdom") ||
      message.includes("advice")
    ) {
      return responses.wisdom[
        Math.floor(Math.random() * responses.wisdom.length)
      ];
    } else if (
      message.includes("help") ||
      message.includes("can") ||
      message.includes("how") ||
      message.includes("learn")
    ) {
      return responses.encouragement[
        Math.floor(Math.random() * responses.encouragement.length)
      ];
    } else {
      return responses.default[
        Math.floor(Math.random() * responses.default.length)
      ];
    }
  } else {
    // c3po
    const responses = characterResponses.c3po;
    if (
      message.includes("hello") ||
      message.includes("hi") ||
      message.includes("greet")
    ) {
      return responses.greetings[
        Math.floor(Math.random() * responses.greetings.length)
      ];
    } else if (
      message.includes("protocol") ||
      message.includes("proper") ||
      message.includes("should") ||
      message.includes("etiquette")
    ) {
      return responses.protocol[
        Math.floor(Math.random() * responses.protocol.length)
      ];
    } else if (
      message.includes("worry") ||
      message.includes("problem") ||
      message.includes("trouble") ||
      message.includes("danger")
    ) {
      return responses.worry[
        Math.floor(Math.random() * responses.worry.length)
      ];
    } else if (
      message.includes("help") ||
      message.includes("assist") ||
      message.includes("can you") ||
      message.includes("please")
    ) {
      return responses.helpful[
        Math.floor(Math.random() * responses.helpful.length)
      ];
    } else {
      return responses.default[
        Math.floor(Math.random() * responses.default.length)
      ];
    }
  }
};
