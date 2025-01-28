"use client"
import Image from "next/image"
import { useState } from "react"
import { generateList } from "@/utils/utils"
import * as colors from "@/utils/colors"

const cardSuits = ["A", "A", "♥", "♠", "♣", "♦", "J", "Q", "K"]

const tableDeck_size = 10
const handDeck_size = 8

function Slot({ text, size = "normal", color = colors.Empty }) {
  const slotSize = size === "small" ? "px-14 py-16" : "px-16 py-20"
  const textSize = size === "small" ? "text-4xl" : "text-6xl"
  return (
    <div
      className={`flex justify-center items-center rounded-xl border-2 ${color} ${slotSize}`}
    >
      <p className={`${textSize}`}>{text}</p>
    </div>
  )
}

function Deck({ list, size = "normal" }) {
  return list.map((each, index) => (
    <Slot
      key={index}
      text={each}
      size={size}
      color={colors.debug_genRandomColor()}
    />
  ))
}

export default function Home() {
  const [tableDeck, setTableDeck] = useState(
    generateList(["o"], tableDeck_size)
  )
  const [handDeck, setHandDeck] = useState(
    generateList(cardSuits, handDeck_size)
  )
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-2 row-start-2 justify-center items-center">
        <div className="flex flex-row gap-2 justify-center items-center">
          <Deck list={tableDeck} size="normal" />
        </div>
        <div className="flex flex-row gap-2 justify-center items-center mt-20">
          <Deck list={handDeck} size="small" />
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://github.com/PagP332/CardGame/tree/main/card-game"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Created by Pol →
        </a>
      </footer>
    </div>
  )
}
