import React, { useEffect, useState } from "react";
import { Table, Card, Text, Space } from "@mantine/core";
import { wineDataSet, WineData } from "../constants/winedata";
import calculateMean from "../utilities/calculateMean";
import calculateMedian from "../utilities/calculateMedian";
import calculateMode from "../utilities/calculateMode";
import '../App.css'

interface FlavanoidsData {
  alcoholClass: string;
  mean: string;
  median: string;
  mode: string;
}

const Flavanoids: React.FC = () => {
  const [flavanoidsData, setFlavanoidsData] = useState<FlavanoidsData[]>([]);

  useEffect(() => {
    const calculateStatistics = (data: WineData[]) => {
      const meanValues: { [key: number]: (string | number)[] } = {};
      const medianValues: { [key: number]: (string | number)[] } = {};
      const modeValues: { [key: number]: (string | number)[] } = {};
      
      // Group flavanoids data by class of alcohol
      data.forEach((item: WineData) => {
        const alcoholClass = item.Alcohol;
        if (!meanValues[alcoholClass]) {
          meanValues[alcoholClass] = [];
          medianValues[alcoholClass] = [];
          modeValues[alcoholClass] = [];
        }
        meanValues[alcoholClass].push(item.Flavanoids);
        medianValues[alcoholClass].push(item.Flavanoids);
        modeValues[alcoholClass].push(item.Flavanoids);
      });

      // Calculate mean, median, and mode for each class of alcohol
      const meanData = Object.entries(meanValues).map(
        ([alcoholClass, values]) => ({
          alcoholClass,
          mean: calculateMean(values).toFixed(3),
        })
      );
      const medianData = Object.entries(medianValues).map(
        ([alcoholClass, values]) => ({
          alcoholClass,
          median: calculateMedian(values).toFixed(3),
        })
      );
      const modeData = Object.entries(modeValues).map(
        ([alcoholClass, values]) => ({
          alcoholClass,
          mode: calculateMode(values).toFixed(3),
        })
      );

      // Combine mean, median, and mode data for each class of alcohol
      const combinedData: FlavanoidsData[] = meanData.map((meanItem) => ({
        ...meanItem,
        median: medianData.find(
          (medianItem) => medianItem.alcoholClass === meanItem.alcoholClass
        )!.median,
        mode: modeData.find(
          (modeItem) => modeItem.alcoholClass === meanItem.alcoholClass
        )!.mode,
      }));

      setFlavanoidsData(combinedData);
    };

    calculateStatistics(wineDataSet);
  }, []);

  return (
    <Card className="flavanoids-table">
      <Text size="xl" fw={700} ta="center">
        Wine{" "}
        <Text span c="blue" inherit>
          Flavanoids
        </Text>{" "}
        Statistics
      </Text>
      <Space h="xl" />
        <Table
          striped
          highlightOnHover
          withTableBorder
          horizontalSpacing="xl"
          verticalSpacing="lg"
          withColumnBorders
        >
          <Table.Thead>
            <Table.Tr>
              <Table.Th style={{ textAlign: "center" }}>
                Flavanoids Measure
              </Table.Th>
              {flavanoidsData.map((value, index) => (
                <Table.Th style={{ textAlign: "center" }} key={index}>Class {value.alcoholClass}</Table.Th>
              ))}
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            <Table.Tr>
              <Table.Td>
                Flavanoids Mean
              </Table.Td>
              {flavanoidsData.map((item, index) => (
                <Table.Td key={index}>{item.mean}</Table.Td>
              ))}
            </Table.Tr>
            <Table.Tr>
              <Table.Td>
                Flavanoids Median
              </Table.Td>
              {flavanoidsData.map((item, index) => (
                <Table.Td key={index}>{item.median}</Table.Td>
              ))}
            </Table.Tr>
            <Table.Tr>
              <Table.Td>
                Flavanoids Mode
              </Table.Td>
              {flavanoidsData.map((item, index) => (
                <Table.Td key={index}>{item.mode}</Table.Td>
              ))}
            </Table.Tr>
          </Table.Tbody>
        </Table>
    </Card>
  );
};

export default Flavanoids;
