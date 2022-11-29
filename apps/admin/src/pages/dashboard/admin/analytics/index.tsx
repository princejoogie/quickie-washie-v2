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

  return (
    <Layout nav={{ title: "Analytics" }} onRefresh={sales.refetch}>
      <View className="mt-4 flex flex-row items-center justify-evenly">
        <TouchableOpacity
          onPress={() => {
            setFilter("1D");
          }}
          className={`flex-1 rounded ${
            filter === "1D" ? "bg-gray-800" : "bg-transparent"
          }`}
        >
          <Text className="text-center text-lg text-white">1D</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            setFilter("1W");
          }}
          className={`flex-1 rounded ${
            filter === "1W" ? "bg-gray-800" : "bg-transparent"
          }`}
        >
          <Text className="text-center text-lg text-white">1W</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            setFilter("1M");
          }}
          className={`flex-1 rounded ${
            filter === "1M" ? "bg-gray-800" : "bg-transparent"
          }`}
        >
          <Text className="text-center text-lg text-white">1M</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            setFilter("3M");
          }}
          className={`flex-1 rounded ${
            filter === "3M" ? "bg-gray-800" : "bg-transparent"
          }`}
        >
          <Text className="text-center text-lg text-white">3M</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            setFilter("1Y");
          }}
          className={`flex-1 rounded ${
            filter === "1Y" ? "bg-gray-800" : "bg-transparent"
          }`}
        >
          <Text className="text-center text-lg text-white">1Y</Text>
        </TouchableOpacity>
      </View>

      <Text className="mt-4 text-gray-400">Total Sales</Text>
      <Text className="mt-1 text-4xl font-bold text-gray-300">
        ₱{totalSales.toFixed(2)}
      </Text>

      <View className="mt-4 rounded-md p-2">
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
            className={`mt-1 flex flex-row items-center justify-between rounded p-1 ${
              i % 2 === 0 ? "bg-gray-800" : "bg-transparent"
            }`}
          >
            <Text className="text-xs text-gray-400">
              {format(e.date, "MMM d")} - {format(e.date, "hh:mm aa")}
            </Text>

            <Text className="text-xs font-bold text-white">
              {e.price.toFixed(2)}
            </Text>
          </View>
        ))}
      </View>
    </Layout>
  );
};
