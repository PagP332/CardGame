"use client"
import Image from "next/image"
import { useState, useEffect, useRef } from "react"
import * as utils from "@/utils/utils"
import * as colors from "@/utils/colors"
import { RollChance, Empty } from "@/utils/rarity"

function ChanceList({ list }) {
  return (
    <div className="flex gap-5">
      {Object.entries(list.chances).map(([key, value]) => (
        <p key={key} className={`${colors.textColor[key]}`}>
          {Math.trunc(value * 100) + "%"}
        </p>
      ))}
    </div>
  )
}

export default function Home() {
  const [level, setLevel] = useState(0)
  const [rarityChance, setRarityChance] = useState(RollChance[level])
  const [tableDeck, setTableDeck] = useState(utils.generateList(utils.tableDeck_size, true))
  const [handDeck, setHandDeck] = useState(utils.generateList(utils.handDeck_size, false, rarityChance.chances))
  const [isTableFull, setIsTableFull] = useState(false)
  const [prevTriplet, setPrevTriplet] = useState([])

  useEffect(() => {
    setRarityChance(RollChance[level])
  }, [level])

  useEffect(() => {
    setHandDeck(handDeck)
  }, [handDeck])

  useEffect(() => {
    console.log("Table side effect")

    const triplets = utils.combineCards(tableDeck)
    if (triplets) {
      onTripletFound(triplets)
    }
    if (getEmptySlot() === -1) setIsTableFull(true)
    else setIsTableFull(false)
  }, [tableDeck])

  const refreshHand = () => {
    setHandDeck(utils.generateList(utils.handDeck_size, false, rarityChance.chances))
  }

  const getEmptySlot = () => {
    // console.log("table deck ", tableDeck)
    const r = tableDeck.findIndex((each) => each.rarity.value === 0)
    return r
  }

  const onTripletFound = (triplets) => {
    const cardCopy = tableDeck[triplets[0]]
    cardCopy.combinations += 1
    cardCopy.multiplier = utils.getMultiplier(cardCopy.combinations)
    console.log("Before", tableDeck)
    setTableDeck((prevTableDeck) => {
      const newTableDeck = [...prevTableDeck]
      newTableDeck[triplets[0]] = cardCopy
      newTableDeck[triplets[1]] = utils.emptyCard(triplets[1])
      newTableDeck[triplets[2]] = utils.emptyCard(triplets[2])

      return newTableDeck
    })
  }

  const handleHandCardPressed = (index) => {
    handDeck.map((each, i) => {
      if (i === index) {
        placeCardOnTableDeck(each)
      }
    })
    if (!isTableFull) {
      setHandDeck((prevHandDeck) => {
        const newHandDeck = [...prevHandDeck]
        newHandDeck[index] = utils.emptyCard(index)
        return newHandDeck
      })
    }
    // console.log(handDeck)
  }

  const handleTableCardPresed = (index) => {
    setTableDeck((prevTableDeck) => {
      const newTableDeck = [...prevTableDeck]
      newTableDeck[index] = utils.emptyCard(index)
      return newTableDeck
    })
  }

  const placeCardOnTableDeck = (currentCard) => {
    setTableDeck((prevTableDeck) => {
      const newTableDeck = [...prevTableDeck]
      const emptySlotIndex = getEmptySlot()
      if (emptySlotIndex !== -1) newTableDeck[emptySlotIndex] = currentCard
      return newTableDeck
    })
  }

  function Slot({ index, text, size = "normal", color = colors.Empty, onHand, multiplier }) {
    const slotSize = size === "small" ? "px-14 py-16" : "px-16 py-20"
    const textSize = size === "small" ? "text-4xl" : "text-6xl"
    const contentSize = size === "small" ? "w-[100px] h-[130px]" : "w-[150px] h-[195px]"
    return (
      <button
        className={`relative flex justify-center items-center rounded-xl border-2 ${color} transition-all duration-200 ease-in-out hover:scale-105 hover:mx-2`}
        onClick={() => {
          console.log(`Index ${index} Card pressed on ${onHand ? "Hand" : "Table"} Deck`)
          onHand ? handleHandCardPressed(index) : handleTableCardPresed(index)
        }}
      >
        {multiplier && multiplier !== 1 && (
          <span className="absolute top-2 left-2 text-sm font-bold text-white rounded px-2 py-1">{multiplier}x</span>
        )}
        <p className={`${textSize} ${contentSize} flex items-center justify-center`}>{text}</p>
      </button>
    )
  }

  function Deck({ list, size = "normal", color = colors.Empty, onHand }) {
    return list.map((each, index) => (
      <Slot
        key={index}
        index={index}
        multiplier={each.multiplier}
        text={each.suit}
        size={size}
        color={each.rarity ? each.rarity.color : colors.Empty}
        onHand={onHand}
      />
    ))
  }

  function Debug({ isVisible }) {
    return (
      <div>
        <button
          className="flex p-3 border mt-3"
          onClick={() => {
            if (level < 9) {
              setLevel(level + 1)
            }
          }}
        >
          debug: level up
        </button>
        <button
          className="flex p-3 border mt-3"
          onClick={() => {
            setLevel(0)
            setTableDeck(utils.generateList(utils.tableDeck_size, true))
          }}
        >
          debug: reset level
        </button>
      </div>
    )
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-2 row-start-2 justify-center items-center">
        <div className="flex flex-row gap-2 justify-center items-center">
          <Deck list={tableDeck} size="normal" onHand={false} />
        </div>
        <div className="flex flex-row gap-2 justify-center items-center mt-20">
          <Deck list={handDeck} size="small" color={utils.generateList(colors.colorList, utils.handDeck_size)} onHand={true} />
        </div>
        <button className="flex flex-row justify-center items-center border rounded-full m-10 size-16" onClick={refreshHand}>
          <p>⟳</p>
        </button>
        <p>Level {rarityChance.level}</p>
        <ChanceList list={rarityChance} />
        <Debug isVisible={true} />
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://github.com/PagP332/CardGame/tree/main/card-game"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image aria-hidden src="/globe.svg" alt="Globe icon" width={16} height={16} />
          Created by Pol →
        </a>
      </footer>
    </div>
  )
}
