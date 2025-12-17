const ServiceApplication = require("../models/ServiceApplication");

// ================= USER: APPLY FOR SERVICE =================
exports.applyService = async (req, res) => {
  try {
    const {
      serviceType,
      fullName,
      address,
      mobile
    } = req.body;

    if (!serviceType || !fullName || !address || !mobile) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const application = new ServiceApplication({
      user: req.user.id,
      serviceType,
      fullName,
      address,
      mobile,
      documents: req.files ? req.files.map(file => file.path) : []
    });

    await application.save();

    res.status(201).json({
      message: "Application submitted successfully",
      application
    });

  } catch (error) {
  console.error("APPLY SERVICE ERROR 👉", error);
  res.status(500).json({ message: "Failed to submit application" });
}
};

// ================= ADMIN: VIEW ALL APPLICATIONS =================
exports.getAllApplications = async (req, res) => {
  try {
    const applications = await ServiceApplication.find()
      .populate("user", "fullName mobile email")
      .sort({ createdAt: -1 });

    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: "Unable to fetch applications" });
  }
};

// ================= ADMIN: APPROVE / REJECT =================
exports.updateApplicationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, adminRemark } = req.body;

    if (!["Approved", "Rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const application = await ServiceApplication.findById(id);
    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    application.status = status;
    application.adminRemark = adminRemark || "";
    await application.save();

    res.json({ message: `Application ${status} successfully` });

  } catch (error) {
    res.status(500).json({ message: "Failed to update application" });
  }
};

// ================= USER: APPLY FOR SERVICE =================
exports.applyService = async (req, res) => {
  try {
    const application = new ServiceApplication({
      user: req.user._id,
      serviceType: req.body.serviceType,
      fullName: req.body.fullName,
      address: req.body.address,
      mobile: req.body.mobile,
      documents: req.files?.map(file => file.path) || []
    });

    await application.save();

    res.status(201).json({
      message: "Application submitted successfully",
      application
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to submit application" });
  }
};
