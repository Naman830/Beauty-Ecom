"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { Address } from "@/types"

interface AddressState {
  addresses: Address[]
  addAddress: (address: Omit<Address, "id">) => void
  removeAddress: (id: string) => void
  updateAddress: (id: string, data: Partial<Address>) => void
  clearAddresses: () => void
}

export const useAddressStore = create<AddressState>()(
  persist(
    (set) => ({
      addresses: [],

      addAddress: (address) => {
        const newAddress: Address = {
          ...address,
          id: `addr-${Date.now()}`,
        }

        set((state) => ({
          addresses: [...state.addresses, newAddress],
        }))
      },

      removeAddress: (id) => {
        set((state) => ({
          addresses: state.addresses.filter((address) => address.id !== id),
        }))
      },

      updateAddress: (id, data) => {
        set((state) => ({
          addresses: state.addresses.map((address) =>
            address.id === id ? { ...address, ...data } : address
          ),
        }))
      },

      clearAddresses: () => set({ addresses: [] }),
    }),
    {
      name: "address-storage",
    }
  )
)
