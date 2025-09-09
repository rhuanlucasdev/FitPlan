import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import {
  faMinus,
  faChevronLeft,
  faPrint,
} from "@fortawesome/free-solid-svg-icons";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import EnhancedFoodSelector from "./EnhancedFoodSelector";
import { EnhancedFoodService } from "../services/EnhancedFoodService";
import type { FoodMacros, Food } from "../types/Food";

interface FoodRow {
  qtd: string;
  alimento: string;
  foodId?: string;
  kcal: string;
  prot: string;
  carb: string;
  gord: string;
}

interface MealTable {
  nome: string;
  rows: FoodRow[];
}

export default function DietTable() {
  const [meals, setMeals] = useState<MealTable[]>([
    {
      nome: "Café da manhã",
      rows: [
        {
          qtd: "",
          alimento: "",
          foodId: "",
          kcal: "",
          prot: "",
          carb: "",
          gord: "",
        },
      ],
    },
  ]);

  // Calculate macros for a food item
  const calculateMacros = async (
    foodId: string,
    quantity: string
  ): Promise<FoodMacros | null> => {
    if (!foodId || !quantity) return null;
    const qty = parseFloat(quantity);
    if (isNaN(qty) || qty <= 0) return null;

    const foods = await EnhancedFoodService.getAllFoods();
    const food = foods.find((f) => f.id === foodId);
    if (!food) return null;

    return EnhancedFoodService.calculateMacros(food, qty);
  };

  // Handle food selection and auto-calculate macros
  const handleFoodSelect = async (
    mealIndex: number,
    rowIndex: number,
    foodName: string,
    foodId?: string
  ) => {
    const newMeals = [...meals];
    newMeals[mealIndex].rows[rowIndex].alimento = foodName;
    newMeals[mealIndex].rows[rowIndex].foodId = foodId || "";

    // Auto-calculate macros if we have both food ID and quantity
    if (foodId && newMeals[mealIndex].rows[rowIndex].qtd) {
      const macros = await calculateMacros(
        foodId,
        newMeals[mealIndex].rows[rowIndex].qtd
      );
      if (macros) {
        newMeals[mealIndex].rows[rowIndex].kcal = macros.calories.toFixed(2);
        newMeals[mealIndex].rows[rowIndex].prot = macros.protein.toFixed(2);
        newMeals[mealIndex].rows[rowIndex].carb = macros.carbs.toFixed(2);
        newMeals[mealIndex].rows[rowIndex].gord = macros.fat.toFixed(2);
      }
    }

    setMeals(newMeals);
  };

  // Handle quantity change and auto-calculate macros
  const handleQuantityChange = async (
    mealIndex: number,
    rowIndex: number,
    quantity: string
  ) => {
    const newMeals = [...meals];
    newMeals[mealIndex].rows[rowIndex].qtd = quantity;

    // Auto-calculate macros if we have both food ID and quantity
    const foodId = newMeals[mealIndex].rows[rowIndex].foodId;
    if (foodId && quantity) {
      const macros = await calculateMacros(foodId, quantity);
      if (macros) {
        newMeals[mealIndex].rows[rowIndex].kcal = macros.calories.toFixed(2);
        newMeals[mealIndex].rows[rowIndex].prot = macros.protein.toFixed(2);
        newMeals[mealIndex].rows[rowIndex].carb = macros.carbs.toFixed(2);
        newMeals[mealIndex].rows[rowIndex].gord = macros.fat.toFixed(2);
      }
    }

    setMeals(newMeals);
  };

  const addMeal = () => {
    setMeals([
      ...meals,
      {
        nome: "Nova Refeição",
        rows: [
          {
            qtd: "",
            alimento: "",
            foodId: "",
            kcal: "",
            prot: "",
            carb: "",
            gord: "",
          },
        ],
      },
    ]);
  };

  const removeMeal = (mealIndex: number) => {
    if (meals.length === 1) return;
    setMeals(meals.filter((_, index) => index !== mealIndex));
  };

  const addRow = (mealIndex: number) => {
    const newMeals = [...meals];
    newMeals[mealIndex].rows.push({
      qtd: "",
      alimento: "",
      foodId: "",
      kcal: "",
      prot: "",
      carb: "",
      gord: "",
    });
    setMeals(newMeals);
  };

  const removeRow = (mealIndex: number, rowIndex: number) => {
    const newMeals = [...meals];
    newMeals[mealIndex].rows = newMeals[mealIndex].rows.filter(
      (_, i) => i !== rowIndex
    );
    setMeals(newMeals);
  };

  const updateCell = (
    mealIndex: number,
    rowIndex: number,
    key: keyof FoodRow,
    value: string
  ) => {
    const newMeals = [...meals];
    newMeals[mealIndex].rows[rowIndex][key] = value;
    setMeals(newMeals);
  };

  const updateMealName = (mealIndex: number, value: string) => {
    const newMeals = [...meals];
    newMeals[mealIndex].nome = value;
    setMeals(newMeals);
  };

  const calculateTotals = (meal: MealTable) => {
    const totals = meal.rows.reduce(
      (totals, row) => {
        totals.kcal += Number(row.kcal) || 0;
        totals.prot += Number(row.prot) || 0;
        totals.carb += Number(row.carb) || 0;
        totals.gord += Number(row.gord) || 0;
        return totals;
      },
      { kcal: 0, prot: 0, carb: 0, gord: 0 }
    );

    return {
      kcal: Number(totals.kcal.toFixed(2)),
      prot: Number(totals.prot.toFixed(2)),
      carb: Number(totals.carb.toFixed(2)),
      gord: Number(totals.gord.toFixed(2)),
    };
  };

  const totalGlobal = meals.reduce(
    (totals, meal) => {
      meal.rows.forEach((row) => {
        totals.kcal += Number(row.kcal) || 0;
        totals.prot += Number(row.prot) || 0;
        totals.carb += Number(row.carb) || 0;
        totals.gord += Number(row.gord) || 0;
      });
      return totals;
    },
    { kcal: 0, prot: 0, carb: 0, gord: 0 }
  );

  const formattedTotalGlobal = {
    kcal: Number(totalGlobal.kcal.toFixed(2)),
    prot: Number(totalGlobal.prot.toFixed(2)),
    carb: Number(totalGlobal.carb.toFixed(2)),
    gord: Number(totalGlobal.gord.toFixed(2)),
  };

  const exportPDF = () => {
    const doc = new jsPDF();
    let startY = 20;

    doc.setFontSize(16);
    doc.text("Totais gerais da dieta:", 14, startY);
    doc.setFontSize(12);
    startY += 8;
    doc.text(
      `Kcal: ${formattedTotalGlobal.kcal} | Prot: ${formattedTotalGlobal.prot} | Carb: ${formattedTotalGlobal.carb} | Gord: ${formattedTotalGlobal.gord}`,
      14,
      startY
    );

    startY += 10;

    meals.forEach((meal) => {
      doc.setFontSize(14);
      startY += 10;
      doc.text(meal.nome, 14, startY);

      const columns = ["Qtd", "Alimento", "Kcal", "Prot", "Carb", "Gord"];
      const rows = meal.rows.map((row) => [
        row.qtd,
        row.alimento,
        row.kcal,
        row.prot,
        row.carb,
        row.gord,
      ]);

      autoTable(doc, {
        head: [columns],
        body: rows,
        startY: startY + 8,
        headStyles: {
          fillColor: [192, 192, 192],
          textColor: [0, 0, 0],
          fontStyle: "bold",
        },
        bodyStyles: { textColor: [0, 0, 0] },
      });

      startY = (doc as any).lastAutoTable?.finalY ?? startY;
    });

    doc.save("dieta.pdf");
  };

  return (
    <div className="p-6 space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0 mb-6">
        <Link to="/">
          <FontAwesomeIcon icon={faChevronLeft} />
        </Link>
        <h1 className="text-3xl md:text-4xl text-[#111111] font-bold">
          Monte sua dieta
        </h1>
        <button
          className="bg-[#111111] text-white cursor-pointer px-4 py-2 border-2 border-transparent rounded hover:bg-transparent hover:border-2 hover:border-[#111111] hover:text-[#111111] transition"
          onClick={exportPDF}
        >
          <FontAwesomeIcon icon={faPrint} /> Exportar PDF
        </button>
      </div>

      {meals.map((meal, mIndex) => {
        const totals = calculateTotals(meal);
        return (
          <div
            key={mIndex}
            className="p-4 rounded-lg shadow-xl space-y-4 bg-[#ECECEC]"
          >
            <input
              type="text"
              value={meal.nome}
              onChange={(e) => updateMealName(mIndex, e.target.value)}
              className="text-xl font-semibold p-1 w-full focus:outline-none"
            />

            {/* TABLE DESKTOP */}
            <div className="overflow-x-auto">
              <table className="hidden md:table w-full">
                <thead>
                  <tr>
                    {["Qtd", "Alimento", "Kcal", "Prot", "Carb", "Gord"].map(
                      (col) => (
                        <th
                          key={col}
                          className="bg-[#C0C0C0] border-[#CCCCCC] border p-2"
                        >
                          {col}
                        </th>
                      )
                    )}
                    <th className="p-2"></th>
                  </tr>
                </thead>
                <tbody>
                  {meal.rows.map((row, rIndex) => (
                    <tr key={rIndex}>
                      {(
                        [
                          "qtd",
                          "alimento",
                          "kcal",
                          "prot",
                          "carb",
                          "gord",
                        ] as (keyof FoodRow)[]
                      ).map((key) => (
                        <td key={key} className="border-[#CCCCCC] border p-2">
                          {key === "alimento" ? (
                            <EnhancedFoodSelector
                              value={row.alimento}
                              onChange={async (value) => {
                                // Find the food by name to get the ID
                                const foods =
                                  await EnhancedFoodService.getAllFoods();
                                const food = foods.find(
                                  (f) => f.name === value
                                );
                                await handleFoodSelect(
                                  mIndex,
                                  rIndex,
                                  value,
                                  food?.id
                                );
                              }}
                              placeholder="Ex: Arroz"
                              className="w-full"
                            />
                          ) : key === "qtd" ? (
                            <input
                              type="text"
                              value={row.qtd}
                              onChange={async (e) =>
                                await handleQuantityChange(
                                  mIndex,
                                  rIndex,
                                  e.target.value
                                )
                              }
                              placeholder="Ex: 100g"
                              className="w-full p-1 focus:outline-none"
                            />
                          ) : (
                            <input
                              type="number"
                              value={row[key]}
                              onChange={(e) =>
                                updateCell(mIndex, rIndex, key, e.target.value)
                              }
                              className="w-full p-1 focus:outline-none"
                            />
                          )}
                        </td>
                      ))}
                      <td className="border-[#CCCCCC] border p-2 flex justify-center">
                        <button
                          onClick={() => removeRow(mIndex, rIndex)}
                          className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 cursor-pointer"
                        >
                          <FontAwesomeIcon icon={faMinus} />
                        </button>
                      </td>
                    </tr>
                  ))}
                  <tr className="font-bold bg-[#D9D9D9]">
                    <td
                      colSpan={2}
                      className="bg-[#C0C0C0] border-[#CCCCCC] border p-2"
                    >
                      Total
                    </td>
                    <td className="bg-[#C0C0C0] border-[#CCCCCC] border p-2">
                      {totals.kcal}
                    </td>
                    <td className="bg-[#C0C0C0] border-[#CCCCCC] border p-2">
                      {totals.prot}
                    </td>
                    <td className="bg-[#C0C0C0] border-[#CCCCCC] border p-2">
                      {totals.carb}
                    </td>
                    <td className="bg-[#C0C0C0] border-[#CCCCCC] border p-2">
                      {totals.gord}
                    </td>
                  </tr>
                </tbody>
              </table>

              {/* CARDS MOBILE */}
              <div className="md:hidden space-y-4">
                {meal.rows.map((row, rIndex) => (
                  <div
                    key={rIndex}
                    className="border rounded-lg p-3 shadow-md bg-white space-y-2"
                  >
                    {(
                      [
                        "qtd",
                        "alimento",
                        "kcal",
                        "prot",
                        "carb",
                        "gord",
                      ] as (keyof FoodRow)[]
                    ).map((key) => (
                      <div
                        key={key}
                        className="flex justify-between items-center gap-2"
                      >
                        <span className="font-semibold text-gray-700 capitalize">
                          {key}:
                        </span>
                        {key === "alimento" ? (
                          <EnhancedFoodSelector
                            value={row.alimento}
                            onChange={async (value) => {
                              // Find the food by name to get the ID
                              const foods =
                                await EnhancedFoodService.getAllFoods();
                              const food = foods.find((f) => f.name === value);
                              await handleFoodSelect(
                                mIndex,
                                rIndex,
                                value,
                                food?.id
                              );
                            }}
                            placeholder="Ex: Arroz"
                            className="w-[60%]"
                          />
                        ) : key === "qtd" ? (
                          <input
                            type="text"
                            value={row.qtd}
                            onChange={async (e) =>
                              await handleQuantityChange(
                                mIndex,
                                rIndex,
                                e.target.value
                              )
                            }
                            placeholder="Ex: 100g"
                            className="w-[60%] p-1 border border-gray-300 rounded focus:outline-none text-sm"
                          />
                        ) : (
                          <input
                            type="number"
                            placeholder={
                              key === "kcal"
                                ? "200"
                                : key === "prot"
                                ? "10"
                                : key === "carb"
                                ? "40"
                                : "5"
                            }
                            value={row[key]}
                            onChange={(e) =>
                              updateCell(mIndex, rIndex, key, e.target.value)
                            }
                            className="w-[60%] p-1 border border-gray-300 rounded focus:outline-none text-sm"
                          />
                        )}
                      </div>
                    ))}
                    <div className="flex justify-end">
                      <button
                        onClick={() => removeRow(mIndex, rIndex)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 cursor-pointer"
                      >
                        <FontAwesomeIcon icon={faMinus} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Botões */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-2">
              <button
                onClick={() => addRow(mIndex)}
                className="mt-2 bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 cursor-pointer"
              >
                + Adicionar linha
              </button>
              {meals.length > 1 && (
                <button
                  onClick={() => removeMeal(mIndex)}
                  className="ml-2 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 cursor-pointer"
                >
                  Remover refeição
                </button>
              )}
            </div>
          </div>
        );
      })}

      <div className="p-4 rounded-lg shadow-xl bg-[#ECECEC] flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h2 className="font-bold text-lg">Totais da dieta:</h2>
        <div className="flex flex-wrap gap-4 text-sm md:text-base">
          <p>Calorias: {formattedTotalGlobal.kcal} kcal</p>
          <p>Proteínas: {formattedTotalGlobal.prot} g</p>
          <p>Carboidratos: {formattedTotalGlobal.carb} g</p>
          <p>Gorduras: {formattedTotalGlobal.gord} g</p>
        </div>
      </div>

      <button
        onClick={addMeal}
        className="w-full border-2 border-dashed border-gray-500 p-6 rounded-lg text-gray-600 hover:bg-[#999999] cursor-pointer"
      >
        + Adicionar nova refeição
      </button>
    </div>
  );
}
