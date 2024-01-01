/**
 * why??
 *
 *
 * As with any large block of code, I can make my intention clearer by decomposing it and replacing each chunk of code with a function call named after the intention of that chunk.
 *
 * With conditions, I particularly like doing this for the conditional part and each of the alternatives.
 *
 * This way, I highlight the condition and make it clear what I’m branching on. I also highlight the reason for the branching.
 */

if (!aDate.isBefore(plan.summerStart) && !aDate.isAfter(plan.summerEnd)) {
  charge = quantity * plan.summerRate
} else {
  charge = quantity * plan.regularRate + plan.regularServiceCharge
}

