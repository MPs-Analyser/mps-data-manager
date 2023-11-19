const logger = require('../logger');

export const getCategory = (title: string): string => {

    const value = title.toLowerCase();
    
    if (value.includes("financ") || value.includes("bank") || value.includes("money") || value.includes("budget") || value.includes("economy") || value.includes("economic") || value.includes("pension") || value.includes("subsidy") || value.includes("savings")) {
        return "Finance and Economy"
    } else if (value.includes("tax") || value.includes("national insurance")|| value.includes("non-domestic rating") || value.includes("vat")) {
        return "Tax";
    } else if (value.includes("health") || value.includes("coronavirus") || value.includes("NHS") || value.includes("mental")) {
        return "Healthcare"
    } else if (value.includes("environment") || value.includes("flooding") || value.includes("climate") || value.includes("warming")) {
        return "Environment"
    } else if (value.includes("domestic abuse") || value.includes("domestic violence")) {
        return "Domestic Abuse"
    } else if (value.includes("european") || title.includes("EU") || value.includes("windsor framework")) {
        return "European Union"
    } else if (value.includes("educat") || value.includes("school")) {
        return "Education"
    } else if (value.includes("polic") || value.includes("crime") || value.includes("justice") || value.includes("victim") || value.includes("public order") || value.includes("extradition") || value.includes("weapon") || value.includes("court") || value.includes("tribunal")) {
        return "Policing and Crime"
    } else if (value.includes("housing") || value.includes("tenant ") || value.includes("leasehold") || value.includes("building") || value.includes("fire safety")) {
        return "Housing"
    } else if (value.includes("immigration") || value.includes("migration") || value.includes("borders") || value.includes("refuge")) {
        return "Immigration"
    } else if (value.includes("energy") || value.includes("fracking") || value.includes("cole") || value.includes("electricity") || value.includes("oil")|| value.includes("gas") || value.includes("nuclear") || value.includes("smart meter")) {
        return "Energy"
    } else if (value.includes("technology") || value.includes("online") || title.includes("AI") || value.includes("telecommunications") || value.includes("research") || value.includes("internet") || value.includes("electric")) {
        return "Technology"
    } else if (value.includes("northern ireland")) {
        return "Northern Ireland"
    } else if (value.includes("terror")) {
        return "Terrorism"
    } else if (value.includes("levelling")) {
        return "Levelling up"
    } else if (value.includes("drugs") || value.includes("cannabis")) {
        return "Drugs";
    } else if (value.includes("voting") || value.includes("election")) {
        return "Voting"
    } else if (value.includes("devolution")) {
        return "Government Structure"
    } else if (value.includes("strikes") || value.includes("professional qualification") || value.includes("trade union")) {
        return "Workers Rights"
    } else if (value.includes("trade") || value.includes("market")) {
        return "International Trade";
    } else if (value.includes("procurement")) {
        return "Procurement";
    } else if (value.includes("sit in private") || value.includes("dissolution") || value.includes("parliamentary")) {
        return "Parliamentary Procedures"
    } else if (value.includes("king") || value.includes("queen") || value.includes("holocaust")) {
        return "State Ceremonies"
    } else if (value.includes("rail") || value.includes("hs2") || value.includes("bus") || value.includes("train")) {
        return "Public Transport"
    } else if (value.includes("national security") || value.includes("armed forces") || value.includes("overseas operations") || value.includes("covert")) {
        return "National Security"
    } else if (value.includes("social security") || value.includes("welfare") || value.includes("benefits") || value.includes("allowance") || value.includes("universal income")) {
        return "Welfare"
    } else if (value.includes("judicial") || value.includes("copyright") || value.includes("liability")) {
        return "Legal Reform"
    } else if (value.includes("agriculture") || value.includes("farm") || value.includes("food") || value.includes("fish")) {
        return "Food and Farming"
    } else if (value.includes("ivory")) {
        return "Environmental Protection"
    } else if (value.includes("data protection") || value.includes("investigatory powers")) {
        return "Civil Liberties"
    } else if (value.includes("wales")) {
        return "Wales"
    }

    logger.warn("Cant find a category for " + title)
 
    return 'undefined';
}