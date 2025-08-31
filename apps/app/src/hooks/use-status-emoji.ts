export default function useStatusEmoji() {
  return {
    mutate: ({ statusEmoji }: { statusEmoji: string }) => {
      console.log(statusEmoji)
    },
  }
}
