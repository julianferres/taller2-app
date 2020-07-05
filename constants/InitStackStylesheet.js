import {StyleSheet} from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: "#00335c",
        backgroundColor: "white",
        alignItems: "center",
        justifyContent: "center",
    },
    inputView: {
        width: "80%",
        backgroundColor: "#465881",
        borderRadius: 25,
        height: 50,
        marginBottom: 20,
        justifyContent: "center",
        padding: 20,
    },
    logo: {
        justifyContent: "center",
        fontWeight: "bold",
        fontSize: 45,
        color: "#00335c",
        marginBottom: 40,
    },
    inputText: {
        height: 50,
        color: "white",
    },
    forgot: {
        color: "#00335c",
        fontSize: 14,
    },
    loginBtn: {
        width: "80%",
        backgroundColor: "#fb5b5a",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        marginBottom: 10,
    },
    loginText: {
        color: "#00335c",
        fontSize: 16,
    },
    forgotPasswordLogo: {
        justifyContent: "center",
        fontWeight: "bold",
        fontSize: 35,
        color: "#00335c",
        marginBottom: 40,
    },
    pickImage: {
        width: "80%",
        backgroundColor: "#265881",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 20,
        flexDirection: "row"
    },
    imagePickerText: {
        color: "white",
        fontSize: 16,
        paddingRight: 10
    },
    activityIndicator: {
        paddingTop: 15
    },
    updateProfileContainer: {
        flex: 1,
        alignItems: "center",
    },
    searchBox: {
        flex: 3.5,
        borderWidth: 0.5,
        borderRadius: 4,
        height: 40,
        marginRight: 10,
        marginTop: 3
    }

});