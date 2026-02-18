import { getSummary } from "@/api/resumes/resumes-api";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export const useResume = (month?: string) => {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: ["summary", month],
    queryFn: () => getSummary(month),
    retry: false,
  });
};
