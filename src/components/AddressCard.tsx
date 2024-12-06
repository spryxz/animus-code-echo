import { useState } from "react";
import { Copy } from "lucide-react";
import { toast } from "sonner";

interface AddressCardProps {
  contractAddress: string;
  donationAddress: string;
}

const AddressCard = ({ contractAddress, donationAddress }: AddressCardProps) => {
  const [copied, setCopied] = useState(false);
  const [copiedDonation, setCopiedDonation] = useState(false);

  const copyAddress = async (address: string, isDonation: boolean) => {
    await navigator.clipboard.writeText(address);
    if (isDonation) {
      setCopiedDonation(true);
      toast.success("Donation address copied!");
      setTimeout(() => setCopiedDonation(false), 2000);
    } else {
      setCopied(true);
      toast.success("Contract address copied!");
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="glass-card p-6 w-full max-w-xl space-y-6 animate-bounce-slow">
      <div className="relative overflow-hidden rounded-lg border border-green-500/20 p-6 bg-gradient-to-r from-red-500/10 to-green-500/10">
        <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 to-green-500/5 animate-pulse" />
        <div>
          <p className="text-sm text-red-400 mb-2 font-bold">Contract Address</p>
          <div className="flex items-center space-x-4">
            <code className="text-green-400 flex-1 overflow-x-auto">
              {contractAddress}
            </code>
            <button
              onClick={() => copyAddress(contractAddress, false)}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              title="Copy contract address"
            >
              <Copy className={copied ? "text-green-400" : "text-white"} />
            </button>
          </div>
        </div>

        <div className="mt-6">
          <p className="text-sm text-red-400 mb-2 font-bold">Donation Address</p>
          <div className="flex items-center space-x-4">
            <code className="text-green-400 flex-1 overflow-x-auto">
              {donationAddress}
            </code>
            <button
              onClick={() => copyAddress(donationAddress, true)}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              title="Copy donation address"
            >
              <Copy className={copiedDonation ? "text-green-400" : "text-white"} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddressCard;