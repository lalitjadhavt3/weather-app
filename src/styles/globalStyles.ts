import { StyleSheet } from "react-native";

export const getStyles = (theme: "light" | "dark") =>
  StyleSheet.create({
    searchContainer: { flexDirection: "column", marginBottom: 10 },
    searchContainerDiv: { flex: 1, justifyContent: "space-around", flexDirection: "row" },
    input: {
      flex: 1,
      borderBottomWidth: 1,
      marginRight: 10,
      padding: 5,
      fontSize: 16,
      color: theme === "dark" ? "white" : "orange", 
      borderBottomColor: theme === "dark" ? "white" : "orange",
      backgroundColor: "rgba(0, 0, 0, 0.6)", 
      
    },
    buttonText: {
      fontSize: 16,
      fontWeight: "400",
      color: "#fff",
    },
    buttonBg: {
      backgroundColor: "#007aff",
      paddingHorizontal: 30,
      paddingVertical: 5,
      borderRadius: 30,
    },
    scrollContent: {
      flexGrow: 1,
    },
    contentContainer: {
      flex: 1,
      padding: 16,
    },
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      padding: 20,
      backgroundColor: theme === "dark" ? "#121212" : "#f5f5f5", 
    },
    header: {
      fontSize: 24,
      fontWeight: "bold",
      marginBottom: 10,
      color: theme === "dark" ? "#eee" : "#222",
    },
    subText: {
      fontSize: 16,
      color: theme === "dark" ? "#bbb" : "#666",
    },
    card: {
      flex: 1,
      padding: 15,
      borderRadius: 10,
      alignItems: "center",
      margin: 5,
      shadowColor: "#000",
      shadowOpacity: 0.2,
      shadowRadius: 4,
      width: 150,
      justifyContent: "center",
      backgroundColor: theme === "dark" ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.6)",
      elevation: 6,
    },
    date: {
      fontSize: 16,
      fontWeight: "bold",
      color: theme === "dark" ? "white" : "orange",
    },
    icon: {
      width: 50,
      height: 50,
      marginVertical: 10,
    },
    temperature: {
      fontSize: 18,
      fontWeight: "bold",
      color: theme === "dark" ? "white" : "orange",
    },
    description: {
      fontSize: 14,
      color: theme === "dark" ? "#bbb" : "lightgray",
      textAlign: "center",
    },
    value: {
      fontSize: 14,
      fontWeight: "bold",
      color: theme === "dark" ?"white" : "orange",
    },
    title: {
      fontSize: 20,
      fontWeight: "bold",
      textAlign: "center",
      marginBottom: 10,
      color: "#fff",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      padding: 10,
      borderRadius: 10,
      overflow: "hidden",
    },
    homeScreenTitle: {
      fontSize: 16,
      fontWeight: "bold",
      color: "#fff",
      textAlign: "center",
      marginBottom: 5,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: "bold",
      marginVertical: 10,
      color: "#fff",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      padding: 8,
      borderRadius: 8,
      overflow: "hidden",
    },
    row: {
      justifyContent: "space-between",
    },
    errorText: {
      textAlign: "center",
      fontSize: 16,
      color: "red",
      fontWeight: "bold",
    },
    background: {
      flex: 1,
      resizeMode: "cover",
      padding: 20,
    },
    weatherInfoContainer: {
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      padding: 10,
      borderRadius: 10,
      marginBottom: 10,
    },
    weatherCardContainer: {
      backgroundColor: "rgba(255, 255, 255, 0.8)",
      padding: 10,
      borderRadius: 10,
    },
    loadingContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: theme === "dark" ? "#121212" : "#f5f5f5",
    },
    toggleButton: {
      position: "absolute",
      bottom: 20,
      right: 20,
      backgroundColor: theme === "dark" ? "#fff" : "#000",
      padding: 12,
      borderRadius: 30,
      elevation: 5,
    },
    toggleButtonText: {
      fontSize: 16,
      fontWeight: "bold",
      color: theme === "dark" ? "#000" : "#fff",
    },
  });