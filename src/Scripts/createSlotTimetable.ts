import { AppDataSource } from "../data-source";
import { SlotTimetables } from "../entity/SlotTimetables";

async function createSlotTimetable() {
    if (!AppDataSource.isInitialized) {
        await AppDataSource.initialize();
        console.log("Data Source has been initialized.");
    }

    const slotRepository = AppDataSource.getRepository(SlotTimetables);

    const existingSlots = await slotRepository.find();
    if (existingSlots.length > 0) {
        console.log("Slot timetable already exists.");
        return;
    }

    const slots = [
        { start_time: "09:00", end_time: "10:20" },
        { start_time: "10:30", end_time: "11:50" },
        { start_time: "12:10", end_time: "13:30" },
        { start_time: "13:40", end_time: "15:00" },
        { start_time: "15:10", end_time: "16:20" },
        { start_time: "16:30", end_time: "18:00" },
    ];

    for (const slot of slots) {
        const slotEntry = new SlotTimetables();
        slotEntry.start_time = slot.start_time;
        slotEntry.end_time = slot.end_time;

        try {
            await slotRepository.save(slotEntry);
        } catch (error) {
            console.error("Error saving slot entry:", error);
        }
    }

    console.log("Slot timetable created successfully.");
}
createSlotTimetable().catch((error) => {
    console.error("Error creating slot timetable:", error);
});
