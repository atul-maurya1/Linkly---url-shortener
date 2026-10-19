import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true, // Fixed typo
            index: true,
        },
        planId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Plan",
            required: true,
        },
        status: {
            type: String,
            // Razorpay subscription lifecycles + a general past_due/failed state
            enum: [
                "created", 
                "authenticated", 
                "active", 
                "pending", 
                "halted", 
                "cancelled", 
                "completed", 
                "expired"
            ],
            default: "created",
            required: true,
        },
        paymentProvider: {
            type: String,
            enum: ["stripe", "razorpay", "custom"],
            default: "razorpay",
        },
        gatewayCustomerId: {
            type: String,
            required: true,
        },
        gatewaySubscriptionId: {
            type: String,
            required: true,
            unique: true, // Ensure no duplicate subscriptions
        },
        // --- ADDED: Access Gating & Timestamps ---
        currentPeriodStart: {
            type: Date,
        },
        currentPeriodEnd: {
            type: Date,
            index: true, // Speeds up checks for expired subscriptions
        },
        cancelAtPeriodEnd: {
            type: Boolean,
            default: false,
        }
    },
    { timestamps: true },
);

const Subscription = mongoose.model("Subscription", subscriptionSchema);
export default Subscription;