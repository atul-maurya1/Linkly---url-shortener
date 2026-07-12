

const Setting = () => {
   


    return (
        <div className="max-w-xl mx-auto my-10 font-sans">
            <h2 className="mb-2 text-2xl font-semibold">Account Settings</h2>
            <div className="grid gap-4">
                <div className="p-4 border border-gray-200 rounded-2xl bg-white">
                    <div className="text-xs text-gray-500 mb-1.5">Registered Email</div>
                    <div className="text-base text-slate-900 font-semibold">test@gmail.com</div>
                </div>

                <div className="p-4 border border-gray-200 rounded-2xl bg-white">
                    <div className="flex items-center justify-between mb-2.5">
                        <div>
                            <div className="text-sm font-semibold">Change Password</div>
                            <div className="text-xs text-gray-600">UI only — functionality disabled</div>
                        </div>
                        <button  className="px-3 py-2 rounded-xl border border-gray-300 bg-slate-50 text-gray-600 cursor-not-allowed">
                            Change
                        </button>
                    </div>

                    <div className="grid gap-2.5">
                        <input placeholder="Current password" type="password"  className="w-full p-2.5 rounded-xl border border-gray-200 bg-slate-50 text-sm" />
                        <input placeholder="New password" type="password"  className="w-full p-2.5 rounded-xl border border-gray-200 bg-slate-50 text-sm" />
                        <input placeholder="Confirm new password" type="password"  className="w-full p-2.5 rounded-xl border border-gray-200 bg-slate-50 text-sm" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Setting