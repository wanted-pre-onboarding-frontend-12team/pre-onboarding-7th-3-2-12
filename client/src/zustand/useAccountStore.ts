import { Zus_Active, Zus_Broker_id, Zus_Status } from '@src/constants/zustand';
import create from 'zustand';

type Store = {
	broker: Zus_Broker_id;
	status: Zus_Status;
	active: Zus_Active;
	setBroker: (broker: Zus_Broker_id) => void;
	setStatus: (status: Zus_Status) => void;
	setActive: (active: Zus_Active) => void;
};

const useAccountStore = create<Store>(
	(set): Store => ({
		broker: '',
		status: '',
		active: '',
		setBroker: (broker: Zus_Broker_id) => set((state) => ({ broker })),
		setStatus: (status: Zus_Status) => set((state) => ({ status })),
		setActive: (active: Zus_Active) => set((state) => ({ active })),
	}),
);

export default useAccountStore;
