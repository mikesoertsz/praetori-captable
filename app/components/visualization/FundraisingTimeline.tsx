"use client";

import { FundingData } from "@/app/lib/types";
import { formatCurrency } from "@/app/lib/utils";

interface FundraisingTimelineProps {
  data: FundingData;
}

export default function FundraisingTimeline({
  data,
}: FundraisingTimelineProps) {
  return (
    <div className="h-full overflow-y-auto p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">
        Fundraising Timeline
      </h2>

      <div className="space-y-6">
        {data.rounds.map((round, index) => (
          <div key={round.id} className="border-l-2 border-gray-200 pl-4 pb-6">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full -ml-5"></div>
              <h3 className="text-sm font-semibold text-gray-900">
                {round.name}
              </h3>
            </div>

            <div className="space-y-2 text-xs text-gray-600">
              <div className="flex justify-between">
                <span>Amount Raised:</span>
                <span className="font-medium">
                  {formatCurrency(round.amountRaised)}
                </span>
              </div>

              <div className="flex justify-between">
                <span>Pre-money Valuation:</span>
                <span className="font-medium">
                  {formatCurrency(round.preMoneyValuation)}
                </span>
              </div>

              <div className="flex justify-between">
                <span>Post-money Valuation:</span>
                <span className="font-medium">
                  {formatCurrency(round.postMoneyValuation)}
                </span>
              </div>

              <div className="flex justify-between">
                <span>Investor Ownership:</span>
                <span className="font-medium">
                  {round.capTable.investors.toFixed(1)}%
                </span>
              </div>

              <div className="flex justify-between">
                <span>Founder Ownership:</span>
                <span className="font-medium">
                  {round.capTable.founders.toFixed(1)}%
                </span>
              </div>

              <div className="flex justify-between">
                <span>Total Dilution:</span>
                <span className="font-medium">
                  {round.targetDilution.toFixed(1)}%
                </span>
              </div>

              {index > 0 && (
                <div className="pt-2 border-t border-gray-100">
                  <div className="flex justify-between text-gray-500">
                    <span>Previous Investor Dilution:</span>
                    <span className="font-medium">
                      {(
                        (data.rounds[index - 1].capTable.investors *
                          (100 - round.targetDilution)) /
                        100
                      ).toFixed(1)}
                      %
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Summary Section */}
      <div className="mt-8 p-4 bg-gray-50 rounded-lg">
        <h4 className="text-sm font-semibold text-gray-900 mb-3">Summary</h4>
        <div className="space-y-2 text-xs text-gray-600">
          <div className="flex justify-between">
            <span>Total Raised:</span>
            <span className="font-medium">
              {formatCurrency(
                data.rounds.reduce(
                  (total, round) => total + round.amountRaised,
                  0
                )
              )}
            </span>
          </div>

          <div className="flex justify-between">
            <span>Final Valuation:</span>
            <span className="font-medium">
              {formatCurrency(
                data.rounds[data.rounds.length - 1].postMoneyValuation
              )}
            </span>
          </div>

          <div className="flex justify-between">
            <span>Final Founder Ownership:</span>
            <span className="font-medium">
              {data.rounds[data.rounds.length - 1].capTable.founders.toFixed(1)}
              %
            </span>
          </div>

          <div className="flex justify-between">
            <span>Total Dilution:</span>
            <span className="font-medium">
              {data.rounds
                .reduce((total, round) => total + round.targetDilution, 0)
                .toFixed(1)}
              %
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
