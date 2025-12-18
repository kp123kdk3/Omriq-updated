import { omriqGrandPalais as H } from "@/lib/hotel/omriqGrandPalais";

function cToF(c: number) {
  return (c * 9) / 5 + 32;
}

function fmtTemp(c: number) {
  return `${c.toFixed(c % 1 === 0 ? 0 : 1)}°C (${cToF(c).toFixed(1)}°F)`;
}

function includesAny(s: string, words: string[]) {
  return words.some((w) => s.includes(w));
}

function normalize(text: string) {
  return text.toLowerCase().replace(/\s+/g, " ").trim();
}

export function respondAsOmriqGrandPalais(userText: string) {
  const q = normalize(userText);
  if (!q) {
    return "How may I assist you at Omriq Grand Palais?";
  }

  // Climate / temperature
  if (includesAny(q, ["temperature", "temp", "degrees", "celsius", "fahrenheit", "room temperature", "ac", "air conditioning"])) {
    return (
      `At ${H.name}, room temperature is set to ${fmtTemp(H.climate.roomsDefaultC)} by default. ` +
      `You can customize your room between ${H.climate.roomRangeC.min}°C and ${H.climate.roomRangeC.max}°C ` +
      `in ${H.climate.roomRangeC.increment}° increments using the in-room tablet or by voice request. ` +
      `For reference, the gym is maintained at ${fmtTemp(H.climate.gymC)}, and the spa at ${fmtTemp(H.climate.spaC)}.`
    );
  }

  // Air quality / hypoallergenic
  if (includesAny(q, ["hepa", "air quality", "allergy", "hypoallergenic", "feather", "smoking", "filtration"])) {
    return (
      `All rooms include HEPA-grade air filtration. We also offer hypoallergenic rooms with medical-grade filtration, ` +
      `no feather products, and natural cleaning agents. Smoking terraces have separate airflow zones.`
    );
  }

  // Bedding / pillows / sleep
  if (includesAny(q, ["pillow", "pillows", "mattress", "bed", "bedding", "thread count", "duvet", "blackout"])) {
    return (
      `We offer three mattress options: ${H.sleep.mattresses.map((m) => m.name).join(", ")}. ` +
      `Our linens are ${H.sleep.threadCount}, with seasonal duvet rotation. ` +
      `We also have a pillow menu including ${H.sleep.pillowMenu.slice(0, 6).join(", ")}, and more on request. ` +
      `${H.sleep.blackout}`
    );
  }

  // Gym / dumbbells / equipment
  if (includesAny(q, ["gym", "fitness", "dumbbell", "dumbbells", "weights", "kg", "pounds", "technogym", "hammer", "treadmill", "rower", "assault bike"])) {
    return (
      `Our gym is maintained at ${fmtTemp(H.climate.gymC)} with humidity control and is designed for elite-level training. ` +
      `Dumbbells range from ${H.gym.dumbbellsKg.min} kg to ${H.gym.dumbbellsKg.max} kg. The largest single dumbbell is ${H.gym.dumbbellsKg.largestSingle} kg. ` +
      `Increments are ${H.gym.increments.join(", ")}. ` +
      `We also have Technogym and Hammer Strength machines, plus cardio including treadmills (incline up to 15%), stair climbers, water-resistance rowers, and assault bikes.`
    );
  }

  // Spa / massage
  if (includesAny(q, ["spa", "massage", "treatment", "hot stone", "deep tissue", "swedish", "aromatherapy", "prenatal", "reflexology", "couples"])) {
    const list = H.spa.treatments.map((t) => t.name).join(", ");
    return (
      `Our Wellness Spa is open ${H.spa.hours}. We offer ${list}. ` +
      `Durations are ${H.spa.durationsMin.join(", ")} minutes. If you have allergies and would like aromatherapy, we will do an allergy consultation first.`
    );
  }

  // Pools
  if (includesAny(q, ["pool", "pools", "indoor pool", "outdoor pool", "infinity", "lanes", "water temperature", "kids pool", "lifeguard"])) {
    return (
      `Our indoor pool is ${H.pools.indoor.lengthM} meters with ${H.pools.indoor.lanes} lanes, and the water is kept at ${fmtTemp(H.pools.indoor.waterC)}. ` +
      `The children’s pool is ${H.pools.kids.depthCm} deep and kept at ${fmtTemp(H.pools.kids.waterC)} with a lifeguard on duty. ` +
      `We also have an outdoor infinity pool with seasonal heating and cabanas with temperature-controlled cushions.`
    );
  }

  // Dining / allergies
  if (includesAny(q, ["restaurant", "dining", "breakfast", "menu", "ingredients", "allergen", "gluten", "nuts", "dairy", "milk", "bread"])) {
    return (
      `We proactively ask: "${H.dining.allergyProtocolPrompt}" ` +
      `We track allergens including ${H.dining.allergensTracked.join(", ")}. ` +
      `Our kitchen supports separate allergen-prep stations, dedicated gluten-free utensils, and a nut-free dessert area. ` +
      `For breakfast, we offer milk options like ${H.dining.breakfastExamples.milkOptions.join(", ")}, and breads such as ${H.dining.breakfastExamples.bread.join(", ")}.`
    );
  }

  // Kids / families / babysitting
  if (includesAny(q, ["kids", "children", "family", "babysitting", "kids club", "cot", "crib", "stroller", "high chair"])) {
    return (
      `Our Kids Club is for ages ${H.families.kidsClub.ages} with a ${H.families.kidsClub.ratio} ratio. Activities include ${H.families.kidsClub.activities.join(", ")}. ` +
      `Babysitting is available 24 hours with notice, with certified caregivers and infant-trained staff. ` +
      `We can also provide baby cots, bottle warmers, strollers, and high chairs on request.`
    );
  }

  // Transfers / transportation
  if (includesAny(q, ["airport", "transfer", "car", "transport", "vehicle", "limo", "limousine", "child seat", "booster"])) {
    return (
      `Airport transfer time is about ${H.transfers.airportMinutes} minutes. Vehicles include ${H.transfers.vehicles.join(", ")}. ` +
      `Child seats are available in ${H.transfers.childSeats.join(", ")} sizes.`
    );
  }

  // Default: ask a clarifying question while staying confident and calm.
  return (
    `I can help with rooms and sleep preferences, spa treatments, gym equipment, pools, dining and allergens, kids services, and transfers. ` +
    `What would you like to know about at ${H.name}?`
  );
}


