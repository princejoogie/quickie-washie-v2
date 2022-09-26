import { useMemo, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { LineChart } from "react-native-svg-charts";
import {
  isToday,
  isThisWeek,
  isThisMonth,
  isThisYear,
  isThisQuarter,
  format,
} from "date-fns";

import { Layout } from "../../../../components";
import { AdminDashboardParamList } from "../types";
import { useQuery } from "@tanstack/react-query";
import analyticsService from "../../../../services/analytics";
import { useIsFocused } from "@react-navigation/native";

export const Analytics = ({}: BottomTabScreenProps<
  AdminDashboardParamList,
  "Analytics"
>) => {
  const [filter, setFilter] = useState("1D");
  const sales = useQuery(["sales"], analyticsService.getSales);
  const isFocused = useIsFocused();

  if (isFocused && sales.isStale) {
    sales.refetch();
  }

  const aggregatedSales = useMemo(() => {
    const _data: Array<{ date: Date; price: number; id: string }> = [];

    sales.data?.forEach((e) => {
      if (e) {
        const date = new Date(e.date);
        const price =
          Number(e.Service?.basePrice ?? 0) +
          Number(e.AdditionalPrice?.price ?? 0);

        if (filter === "1D" && isToday(date)) {
          _data.push({ date, price, id: e.id });
        } else if (filter === "1W" && isThisWeek(date)) {
          _data.push({ date, price, id: e.id });
        } else if (filter === "1M" && isThisMonth(date)) {
          _data.push({ date, price, id: e.id });
        } else if (filter === "3M" && isThisQuarter(date)) {
          _data.push({ date, price, id: e.id });
        } else if (filter === "1Y" && isThisYear(date)) {
          _data.push({ date, price, id: e.id });
        }
      }
    });

    return _data;
  }, [sales.data, filter]);

  const totalSales = useMemo(() => {
    return aggregatedSales?.reduce((acc, e) => acc + e.price, 0);
  }, [aggregatedSales]);

  console.log({ aggregatedSales: aggregatedSales.map((e) => e.price) });

  return (
    <Layout nav={{ title: "Analytics" }} onRefresh={sales.refetch}>
      <View className="flex flex-row items-center justify-evenly mt-4">
        <TouchableOpacity
          onPress={() => {
            setFilter("1D");
          }}
          className={`rounded flex-1 ${
            filter === "1D" ? "bg-gray-800" : "bg-transparent"
          }`}
        >
          <Text className="text-white text-lg text-center">1D</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            setFilter("1W");
          }}
          className={`rounded flex-1 ${
            filter === "1W" ? "bg-gray-800" : "bg-transparent"
          }`}
        >
          <Text className="text-white text-lg text-center">1W</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            setFilter("1M");
          }}
          className={`rounded flex-1 ${
            filter === "1M" ? "bg-gray-800" : "bg-transparent"
          }`}
        >
          <Text className="text-white text-lg text-center">1M</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            setFilter("3M");
          }}
          className={`rounded flex-1 ${
            filter === "3M" ? "bg-gray-800" : "bg-transparent"
          }`}
        >
          <Text className="text-white text-lg text-center">3M</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            setFilter("1Y");
          }}
          className={`rounded flex-1 ${
            filter === "1Y" ? "bg-gray-800" : "bg-transparent"
          }`}
        >
          <Text className="text-white text-lg text-center">1Y</Text>
        </TouchableOpacity>
      </View>

      <Text className="mt-4 text-gray-400">Total Sales</Text>
      <Text className="mt-1 text-gray-300 text-4xl font-bold">
        ₱{totalSales.toFixed(2)}
      </Text>

      <View className="p-2 rounded-md mt-4">
        <LineChart
          style={{ height: 100 }}
          data={[
            {
              data: aggregatedSales.map((e) => e.price),
              svg: { stroke: "#2563eb", strokeWidth: 3 },
            },
          ]}
          contentInset={{ top: 20, bottom: 20 }}
          animate
        />
      </View>

      <Text className="mt-4 text-gray-400">Summary</Text>
      <View className="mt-1">
        {aggregatedSales.map((e, i) => (
          <View
            key={e.id}
            className={`flex flex-row items-center justify-between mt-1 rounded p-1 ${
              i % 2 === 0 ? "bg-gray-800" : "bg-transparent"
            }`}
          >
            <Text className="text-gray-400 text-xs">
              {format(e.date, "MMM d")} - {format(e.date, "hh:mm aa")}
            </Text>

            <Text className="text-xs text-white font-bold">
              {e.price.toFixed(2)}
            </Text>
          </View>
        ))}
      </View>
    </Layout>
  );
};
