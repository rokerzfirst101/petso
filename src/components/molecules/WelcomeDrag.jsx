import React from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import Animated from "react-native-reanimated";
import { PanGestureHandler, State } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import colors from "../../assets/colors";
import { HeaderText } from "../atoms/Text";
import LinearGradient from "react-native-linear-gradient";

const { width } = Dimensions.get("window");
const { cond, eq, add, Value, event, call, greaterOrEq, interpolate } =
  Animated;

export default class WelcomeDrag extends React.Component {
  constructor() {
    super(props);
    this.onDrop = this.onDrop.bind(this);
    this.dragX = new Value(0);
    this.offsetX = new Value(0);
    this.gestureState = new Value(-1);
    this.onGestureEvent = event([
      {
        nativeEvent: {
          translationX: this.dragX,
          state: this.gestureState,
        },
      },
    ]);
    const addX = add(this.offsetX, this.dragX);
    this.transX = cond(
      eq(this.gestureState, State.ACTIVE),
      cond(greaterOrEq(addX, 0), addX),
      [cond(eq(this.gestureState, State.END), call([addX], this.onDrop))]
    );
    this.opacity = interpolate(this.transX, {
      inputRange: [0, width],
      outputRange: [1, 0.1],
    });
    this.priceOpacity = interpolate(this.transX, {
      inputRange: [0, width],
      outputRange: [1, -1],
    });
    this.textOpacity = interpolate(this.transX, {
      inputRange: [0, width],
      outputRange: [0, 2],
    });
    this.textY = interpolate(this.transX, {
      inputRange: [0, width],
      outputRange: [0, -width + 80],
    });
    this.centerTextOpacity = cond(eq(this.gestureState, State.ACTIVE), 0, 1);
  }

  saveDropZone = (e) => {
    const { width, x } = e.nativeEvent.layout;
    this.left = x;
    this.right = x + width;
  };
  onDrop([x]) {
    if (x >= this.left) {
      this.props.confirm();
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Animated.View style={{ opacity: this.priceOpacity }}>
            <HeaderText style={{ fontSize: 18 }}>
              Rs. {this.props.total}
            </HeaderText>
          </Animated.View>
          <Animated.View
            style={{
              opacity: this.textOpacity,
              transform: [{ translateX: this.textY }],
            }}
          >
            <HeaderText style={{ fontSize: 18 }}>Order Placed!</HeaderText>
          </Animated.View>
        </View>
        <View style={{ marginTop: 10 }}>
          <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            colors={["#8021EB", "#04035C"]}
            style={{
              backgroundColor: colors.primary,
              padding: 5,
              borderRadius: 10,
              justifyContent: "center",
            }}
          >
            <PanGestureHandler
              maxPointers={1}
              onGestureEvent={this.onGestureEvent}
              onHandlerStateChange={this.onGestureEvent}
            >
              <Animated.View
                style={[
                  {
                    opacity: this.opacity,
                    transform: [
                      {
                        translateX: this.transX,
                      },
                    ],
                  },
                ]}
              >
                <Icon name="cart" size={35} color="white" />
              </Animated.View>
            </PanGestureHandler>
            <Animated.View
              style={{
                position: "absolute",
                alignSelf: "center",
                opacity: this.centerTextOpacity,
              }}
            >
              <HeaderText style={{ color: "white" }}>
                Drag cart to place order!
              </HeaderText>
            </Animated.View>
            <View
              onLayout={this.saveDropZone}
              style={{
                width: "20%",
                height: 45,
                alignSelf: "flex-end",
                position: "absolute",
              }}
            />
          </LinearGradient>
        </View>
      </View>
    );
  }
}

const CIRCLE_SIZE = 70;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    elevation: 24,
  },
  box: {
    backgroundColor: "tomato",
    marginLeft: -(CIRCLE_SIZE / 2),
    marginTop: -(CIRCLE_SIZE / 2),
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    borderColor: "#000",
  },
});
