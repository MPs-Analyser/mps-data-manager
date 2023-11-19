const logger = require('../logger');

export const getCategory = (title: string): string => {

    const value = title.toLowerCase();
    
    if (value.includes("treasury") || value.includes("cost") || value.includes("financ") || value.includes("bank") || value.includes("money") || value.includes("budget") || value.includes("economy") || value.includes("economic") || value.includes("pension") || value.includes("subsidy") || value.includes("savings")) {
        return "Finance and Economy"
    } else if (value.includes("tax") || value.includes("national insurance")|| value.includes("non-domestic rating") || value.includes("vat")) {
        return "Tax";
    } else if (value.includes("contact tracing") || value.includes("social care") || value.includes("covid") || value.includes("pandemic") || value.includes("medicine") || value.includes("health") || value.includes("coronavirus") || value.includes("nhs") || value.includes("mental") || value.includes("pharmacies") || value.includes("nurs")) {
        return "Healthcare"
    } else if (value.includes("water") || value.includes("renewables") || value.includes("environment") || value.includes("flooding") || value.includes("climate") || value.includes("warming") || value.includes("sustainabiliy")) {
        return "Environment" 
    } else if (value.includes("domestic abuse") || value.includes("domestic violence")) {
        return "Domestic Abuse"
    } else if (value.includes("european") || title.includes("EU") || value.includes("windsor framework") || value.includes("no deal") || value.includes("brexit") || value.includes("confirmatory public vote")) {
        return "European Union"
    } else if (value.includes("sats") ||value.includes("educat") || value.includes("school")) {
        return "Education"
    } else if (value.includes("offence") ||value.includes("prison") || value.includes("polic") || value.includes("crim") || value.includes("justice") || value.includes("victim") || value.includes("public order") || value.includes("extradition") || value.includes("weapon") || value.includes("court") || value.includes("tribunal")) {
        return "Policing and Crime"
    } else if (value.includes("country planning") || value.includes("development") || value.includes("housing") || value.includes("tenant ") || value.includes("leasehold") || value.includes("building") || value.includes("fire safety") || value.includes("neighbourhood") || value.includes("mortgage") || value.includes("rent")) {
        return "Housing"
    } else if (value.includes("asylum") || value.includes("immigration") || value.includes("migration") || value.includes("borders") || value.includes("refuge")) {
        return "Immigration"
    } else if (value.includes("energy") || value.includes("fracking") || value.includes("cole") || value.includes("electricity") || value.includes("oil")|| value.includes("gas") || value.includes("nuclear") || value.includes("smart meter")) {
        return "Energy"
    } else if (value.includes("space") || value.includes("technology") || value.includes("online") || title.includes("AI") || value.includes("telecommunications") || value.includes("research") || value.includes("internet") || value.includes("electric") || value.includes("genetic")) {
        return "Technology"
    } else if (value.includes("northern ireland")) {
        return "Northern Ireland"
    } else if (value.includes("terror")) {
        return "Terrorism"
    } else if (value.includes("levelling")) {
        return "Levelling up"
    } else if (value.includes("drugs") || value.includes("cannabis")) {
        return "Drugs";
    } else if (value.includes("voter") || value.includes("voting") || value.includes("election")) {
        return "Voting"
    } else if (value.includes("devolution")) {
        return "Government Structure"
    } else if (value.includes("strikes") || value.includes("professional qualification") || value.includes("trade union") || value.includes("industrial action") || value.includes("worker") || value.includes("wages") || value.includes("employ")) {
        return "Workers Rights"
    } else if (value.includes("trade") || value.includes("market") || title.includes("EEA")) {
        return "International Trade";
    } else if (value.includes("procurement")) {
        return "Procurement";
    } else if (value.includes("committee on") ||value.includes("sittings") || value.includes("liaison committee") ||value.includes("code of conduct") || value.includes("sittings") ||  value.includes("conduct of") || value.includes("members to committees") || value.includes("autumn statement") || value.includes("lords reform") || title.includes("IPSA") || value.includes("adjournment") || value.includes("privilege motion") || value.includes("minister") || value.includes("home sec") || value.includes("lords amend") || value.includes("sit in private") || value.includes("dissolution") || value.includes("parliamentary") || value.includes("elect") || title.includes("MP") || value.includes("prime min") || value.includes("government")) {
        return "Parliamentary Procedures"
    } else if (value.includes("king") || value.includes("queen") || value.includes("holocaust")) {
        return "State Ceremonies"
    } else if (value.includes("rail") || value.includes("hs2") || value.includes("bus") || value.includes("train") || value.includes("travel") || value.includes("transport")) {
        return "Transport"
    } else if (value.includes("national security") || value.includes("armed forces") || value.includes("overseas operations") || value.includes("covert")) {
        return "National Security"
    } else if (value.includes("cladding") || value.includes("social security") || value.includes("welfare") || value.includes("benefits") || value.includes("allowance") || value.includes("universal credit") || value.includes("homeless") || value.includes("windrush")) {
        return "Welfare"
    } else if (value.includes("judicial") || value.includes("copyright") || value.includes("liability")) {
        return "Legal Reform"
    } else if (value.includes("agricultur") || value.includes("farm") || value.includes("food") || value.includes("fish")) {
        return "Food and Farming"
    } else if (value.includes("ivory")) {
        return "Environmental Protection"
    } else if (value.includes("data protection") || value.includes("investigatory powers")) {
        return "Civil Liberties"
    } else if (value.includes("wales")) {
        return "Wales"
    } else if (value.includes("scot")) {
        return "Scotland"
    } else if (value.includes("daesh") || value.includes("afghanistan") || value.includes("yemen") || value.includes("syria") || value.includes("commonwealth") || value.includes("foreign")) {
        return "Foreign Affairs"
    } else if (value.includes("child")) {
        return "Children"
    }

    logger.warn("Cant find a category for " + title)
 
    return 'Other';
}