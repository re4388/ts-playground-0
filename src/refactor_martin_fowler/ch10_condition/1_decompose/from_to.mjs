// from

if (!aDate.isBefore(plan.summerStart) && !aDate.isAfter(plan.summerEnd)) charge = quantity * plan.summerRate
else
  charge = quantity * plan.regularRate + plan.regularServiceCharge

// to
if (summer())
  charge = summerCharge()
else
  charge = regularCharge()
