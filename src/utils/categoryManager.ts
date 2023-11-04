import { categoryMap } from "../utils/categories";

export const getCategory = (title: string): string => {

    const value = title.toLowerCase();

    if (value.includes("financ") || value.includes("bank") || value.includes("money") || value.includes("budget") || value.includes("tax") || value.includes("economy")) {
        return "Finance and Economy"
    } else if (value.includes("health")) {
        return "Healthcare"
    } else if (value.includes("environment") || value.includes("flooding")) {
        return "Environment"
    } else if (value.includes("domestic abuse") || value.includes("domestic violence")) {
        return "Domestic Abuse"
    } else if (value.includes("european union") || title.includes("EU")) {
        return "European Union"
    } else if (value.includes("educat")) {
        return "Education"
    } else if (value.includes("polic") || value.includes("crime") || value.includes("justice") || value.includes("victim")) {
        return "Policing and Crime"
    } else if (value.includes("housing")) {
        return "Housing"
    } else if (value.includes("immigration")) {
        return "Immigration"
    } else if (value.includes("energy")) {
            return "Energy";
    } else if (value.includes("technology") || value.includes("Online") || title.includes("AI")) {
        return "Technology"
    } else if (value.includes("northern ireland")) {
        return "Northern Ireland"
    } else if (value.includes("terrorism")) {
        return "Terrorism"
    }


    

    




    return categoryMap[title];
}