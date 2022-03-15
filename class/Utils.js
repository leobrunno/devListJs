class Utils {

    static dateFormat(date) {

        return date.toLocaleDateString("pt-BR", {day: "2-digit", month: "short", year:"numeric"})
    }
}