import { StyleSheet } from "react-native";
import Colors from "../constants/Colors";

const ProfileStyles = StyleSheet.create({
  header: {
    backgroundColor: Colors.headerBackground,
  },
  headerTitle: {
    color: Colors.shadow,
    fontFamily: "montserrat-semi-bold",
  },
  flex1: {
    flex: 1,
  },
  flex4: {
    flex: 4,
  },
  headerIcon: {
    color: Colors.mainColor,
  },
  headerGreyIconPlus: {
    color: Colors.mainColor,
    fontSize: 16,
  },
  headerGreyIcon: {
    color: Colors.fume,
  },
  headerBG: {
    backgroundColor: Colors.white,
  },
  content: {
    backgroundColor: Colors.itemGroupsOutside,
  },
  appIcon: {
    marginVertical: 8,
  },
  listsContainer: {
    marginBottom: 72,
  },
  iconListContainer: {
    marginTop: 24,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 24,
    backgroundColor: Colors.white,
    marginHorizontal: -16,
    borderTopColor: Colors.gum,
    borderTopWidth: 1,
    borderBottomColor: Colors.gum,
    borderBottomWidth: 1,
  },
  seperatorContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
  },
  itemDivider: {
    color: Colors.fume,
  },
  getMoreText: {
    marginRight: 8,
    color: Colors.mainDarker,
    fontFamily: "montserrat-semi-bold",
  },
  usageMainContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 24,
    backgroundColor: Colors.white,
    marginHorizontal: -16,
    borderTopColor: Colors.gum,
    borderTopWidth: 1,
    borderBottomColor: Colors.gum,
    borderBottomWidth: 1,
  },
  appInfoContainer: {
    marginHorizontal: 8,
  },
  usageContainer: {
    flex: 1,
    justifyContent: "space-between",
    flexDirection: "row",
    marginHorizontal: 8,
    marginVertical: 16,
  },
  usageItem: {
    flex: 1,
  },
  usageTextBold: {
    fontFamily: 'montserrat-medium',
    color: Colors.fume,
  },
  usageText: {
    marginTop: 8,
    fontSize: 14,
    fontFamily: 'montserrat-medium',
    color: Colors.shadow,
  },
  list: {
    paddingLeft: 16,
    backgroundColor: Colors.white,
    marginHorizontal: -16,
    // marginTop: kVal * 6,
    borderTopColor: Colors.gum,
    borderTopWidth: 1,
  },
  LGView: {
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  listItem: {
    height: 56,
  },

  listItemLeft: {
    flex: 1,
  },
  listLeftText: {
    fontSize: 16,
  },
  logout: {
    fontSize: 16,
    color: Colors.mainColor,
    fontWeight: "bold",
  },
  listItemRight: {
    marginRight: 16,
    flex: 1,
  },
  listRightText: {
    fontSize: 16,
    color: Colors.Grey,
  },
  button: {
    margin: 16,
    backgroundColor: Colors.White,
  },
  buttonText: {
    color: Colors.mainColor,
    fontSize: 16,
    fontWeight: "bold",
  },
  listItemText: {
    color: Colors.shadow,
    fontFamily: "montserrat-medium",
  },
  listItemRightText: {
    color: Colors.fume,
    marginTop: 4,
    fontFamily: "montserrat-medium",
  },
  activeButtonText: {
    color: Colors.mainColor,
    fontFamily: "montserrat-bold",
  },
});

export default ProfileStyles;
